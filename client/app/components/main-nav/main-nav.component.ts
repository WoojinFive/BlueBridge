import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'client/app/shared/auth/auth.service';
import { WorkService } from 'client/app/shared/work.service';

// Services

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  isAuthnticated = false;
  private userSub: Subscription;

  Breakpoints = {
    XSmall: '(max-width: 599.99px)',
    XSmallAndSmall: '(max-width: 959.99px)'
  };

  isXSmallAndSmall$: Observable<boolean> = this.breakpointObserver
    .observe(this.Breakpoints.XSmallAndSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isXSmall$: Observable<boolean> = this.breakpointObserver
    .observe(this.Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private workService: WorkService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthnticated = !user ? false : true;
      this.isAuthnticated = !!user; // same as the above
    });
  }

  onStartWork() {
    this.workService.startWork();
  }

  onFinishWork() {
    this.workService.finishWork();
  }

  onLogout() {
    this.authService.logout();
  }
}
