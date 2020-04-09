import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { WageService } from '../../wage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wage-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  workingHours = [];
  dailyWorkingHours = [];

  subscriptionworkingHours: Subscription;

  constructor(private wageService: WageService) {}

  ngOnInit() {
    this.workingHours = this.wageService.getWorkingHours();
    this.subscriptionworkingHours = this.wageService.workingHoursChanged.subscribe(
      (workingHours: any) => {
        this.workingHours = workingHours;
      }
    );
    this.getDailyWorkingHours();
  }

  getDailyWorkingHours() {
    this.workingHours.map((x) => {
      let totalMinutes: number = moment(x.workFinishTime).diff(
        moment(x.workStartTime),
        'minutes'
      );
      let hours: number = Math.floor(totalMinutes / 60);
      let minutes: number = totalMinutes - hours * 60;
      let item: string = `${hours} hours ${minutes} minutes`;
      this.dailyWorkingHours.push(item);
    });
  }

  ngOnDestroy() {
    this.subscriptionworkingHours.unsubscribe();
  }
}
