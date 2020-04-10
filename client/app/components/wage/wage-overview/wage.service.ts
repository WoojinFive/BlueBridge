import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WageService {
  workingHoursChanged = new Subject<any>();
  public workingHours = [];

  public workingHoursArray = [];
  public totalHoursFloat = 0;
  public hourlyWage = 0;

  public deductions = [];

  constructor() {}

  setWorkingHours(workingHours) {
    this.workingHours = workingHours;
    this.workingHoursChanged.next(this.workingHours.slice());

    this.setWorkingHoursArray(workingHours);
  }

  setWorkingHoursArray = (workingHours) => {
    this.workingHoursArray = [];

    this.getDateArray(1, 31).map((x) => {
      var date = workingHours.find(
        (y) => moment(y.workStartTime).format('D') == x.toString()
      );

      this.workingHoursArray.push(
        date !== undefined
          ? moment
              .duration(
                moment(date.workFinishTime).diff(moment(date.workStartTime))
              )
              .asHours()
              .toFixed(2)
          : 0
      );
    });
  };

  setHourlyWage = (hourlyWage) => {
    this.hourlyWage = hourlyWage;
  };

  getHourlyWage = () => {
    return this.hourlyWage;
  };

  // [1, 2, ... , 30, 31]
  getDateArray = (start, end) => {
    var arr = [];
    var num = start;

    while (num <= end) {
      arr.push(num);
      num += 1;
    }
    return arr;
  };

  // return workingHours object
  getWorkingHours() {
    return this.workingHours.slice();
  }

  getWorkingHoursArray() {
    return this.workingHoursArray.slice();
  }

  getTotalHoursFloat() {
    this.totalHoursFloat = this.workingHoursArray.reduce(
      (a, b) => parseFloat(a) + parseFloat(b),
      0
    );
    return this.totalHoursFloat;
  }

  setDeductions(deductions) {
    this.deductions = deductions;
  }

  getDeductions() {
    if (this.deductions.length !== 0) {
      return this.deductions.slice();
    } else {
      return this.deductions;
    }
  }
}
