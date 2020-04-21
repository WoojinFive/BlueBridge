import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'client/app/shared/auth/auth.service';
import { WorkService } from 'client/app/shared/work.service';

import { User } from '../../shared/user.model';

import moment from 'moment';
import { UserService } from 'client/app/shared/user.service';

// Services

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  isAuthnticated = false;
  private userSub: Subscription;
  // get current login user cookie
  userData = JSON.parse(localStorage.getItem('userData'));

  subscriptionUser: Subscription;
  users: User[];
  currentUser: any;
  currentDate: string;

  diffHours: number;
  diffMinutes: number;

  Breakpoints = {
    XSmall: '(max-width: 599.99px)',
    XSmallAndSmall: '(max-width: 959.99px)',
  };

  isXSmallAndSmall$: Observable<boolean> = this.breakpointObserver
    .observe(this.Breakpoints.XSmallAndSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isXSmall$: Observable<boolean> = this.breakpointObserver
    .observe(this.Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private userService: UserService,
    private workService: WorkService
  ) {}

  ngOnInit() {
    const date = new Date();
    this.currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    const currentDateString = moment(this.currentDate).format('YYYY-MM-DD');

    this.userSub = this.authService.user.subscribe((user) => {
      // this.isAuthnticated = !user ? false : true;
      this.isAuthnticated = !!user; // same as the above
    });

    this.subscriptionUser = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        this.currentUser = this.users.filter(
          (user) => user._id === this.userData.userID
        )[0];

        const currentUserWorkStartTime: string = this.currentUser.workInfo.workTime.filter(
          (work) => moment(work.date).format('YYYY-MM-DD') === currentDateString
        )[0].workStartTime;
        const timeDiff = moment(this.currentDate).diff(
          moment(currentUserWorkStartTime),
          'minutes'
        );
        const diffHours = +(timeDiff / 60).toFixed(0);
        const diffMinutes = timeDiff - diffHours * 60;

        this.diffHours = diffHours;
        this.diffMinutes = diffMinutes;
      }
    );
  }

  onStartWork() {
    const date = new Date();
    const currentDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    const currentDate = moment(date).format('YYYY-MM-DD');

    this.workService.startWork(currentDateTime, currentDate);
  }

  onFinishWork() {
    this.workService.finishWork();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }
}
