import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WageService } from './wage.service';
import { UserService } from 'client/app/shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wage-overview',
  templateUrl: './wage-overview.component.html',
  styleUrls: ['./wage-overview.component.css'],
})
export class WageOverviewComponent implements OnInit {
  currentDate: String;
  currentMonth: Number;
  currentYear: Number;
  previousMonth: Number;
  previousYear: Number;
  user: any;
  workInfo: any;

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = ['2018', '2019', '2020'];

  selectedMonth: string;
  selectedYear: string;

  currentUserData = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private wageService: WageService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const date = new Date();
    this.currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    this.currentYear = +this.currentDate.substring(0, 4);
    this.currentMonth = +this.currentDate.substring(5, 7);

    this.previousMonth = this.currentMonth;
    this.previousYear = this.currentYear;

    this.fetchWorkHistory();
  }

  onChangeLastMonth() {
    this.previousMonth = this.currentMonth;
    this.previousYear = this.currentYear;

    this.currentMonth = +this.currentMonth - 1;
    if (this.currentMonth === 0) {
      this.currentMonth = 12;
      this.currentYear = +this.currentYear - 1;
    }

    this.fetchWorkHistory();
  }

  onChangeNextMonth() {
    this.previousMonth = this.currentMonth;
    this.previousYear = this.currentYear;

    this.currentMonth = +this.currentMonth + 1;
    if (this.currentMonth === 13) {
      this.currentMonth = 1;
      this.currentYear = +this.currentYear + 1;
    }

    this.fetchWorkHistory();
  }

  onSearch(form: NgForm) {
    this.previousMonth = this.currentMonth;
    this.previousYear = this.currentYear;

    if (form.value.selectedMonth !== '' && form.value.selectedYear !== '') {
      this.currentMonth = form.value.selectedMonth;
      this.currentYear = form.value.selectedYear;

      this.fetchWorkHistory();
    }
  }

  fetchWorkHistory() {
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
      this.wageService.setHourlyWage(this.user[0].employeeInfo.hourlyWage);
      if (currentWorkInfos.length) {
        this.currentDate = currentWorkInfos[0].date;
        this.wageService.setWorkingHours(currentWorkInfos);
      } else {
        this.currentMonth = this.previousMonth;
        this.currentYear = this.previousYear;

        const message = 'No data';
        const action = 'Close';

        this.openSnackBar(message, action);
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
