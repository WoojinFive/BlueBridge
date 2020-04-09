import { Component, OnInit } from '@angular/core';
import { WageService } from './wage.service';
import { DataStorageService } from 'client/app/shared/data-storage.service';
import { UserService } from 'client/app/shared/user.service';

@Component({
  selector: 'app-wage-overview',
  templateUrl: './wage-overview.component.html',
  styleUrls: ['./wage-overview.component.css'],
})
export class WageOverviewComponent implements OnInit {
  currentDate: String;
  currentMonth: Number;
  currentYear: Number;
  user: any;
  workInfo: any;

  years = ['2018', '2019', '2020'];

  currentUserData = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private wageService: WageService,
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    this.currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    this.currentYear = +this.currentDate.substring(0, 4);
    this.currentMonth = +this.currentDate.substring(5, 7);

    // fetch user's working hour history
    this.user = this.userService
      .getUsers()
      .filter((user) => user._id === this.currentUserData.userID);

    if (this.user.length) {
      this.workInfo = this.user[0].workInfo.workTime;
      const currentWorkInfos = this.workInfo.filter((date) => {
        const dateString = new Date(date.date).toISOString();
        return (
          this.currentMonth == +dateString.substring(5, 7) &&
          this.currentYear == +dateString.substring(0, 4)
        );
      });
      this.wageService.setWorkingHours(currentWorkInfos);
    }
  }

  onChangeLastMonth() {
    this.currentMonth = +this.currentMonth - 1;
    if (this.currentMonth === 0) {
      this.currentMonth = 12;
      this.currentYear = +this.currentYear - 1;
    }

    // fetch user's working hour history
    this.user = this.userService
      .getUsers()
      .filter((user) => user._id === this.currentUserData.userID);

    this.workInfo = this.user[0].workInfo.workTime;

    const currentWorkInfos = this.workInfo.filter((date) => {
      const dateString = new Date(date.date).toISOString();
      return (
        this.currentMonth == +dateString.substring(5, 7) &&
        this.currentYear == +dateString.substring(0, 4)
      );
    });

    this.currentDate = currentWorkInfos[0].date;

    this.wageService.setWorkingHours(currentWorkInfos);
  }

  onChangeNextMonth() {
    this.currentMonth = +this.currentMonth + 1;
    if (this.currentMonth === 13) {
      this.currentMonth = 1;
      this.currentYear = +this.currentYear + 1;
    }

    // fetch user's working hour history
    this.user = this.userService
      .getUsers()
      .filter((user) => user._id === this.currentUserData.userID);

    this.workInfo = this.user[0].workInfo.workTime;
    const currentWorkInfos = this.workInfo.filter((date) => {
      const dateString = new Date(date.date).toISOString();
      return (
        this.currentMonth == +dateString.substring(5, 7) &&
        this.currentYear == +dateString.substring(0, 4)
      );
    });

    this.currentDate = currentWorkInfos[0].date;

    this.wageService.setWorkingHours(currentWorkInfos);
  }
}
