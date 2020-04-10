import { Component, OnInit, OnDestroy } from '@angular/core';
import { WageService } from './../wage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  subscriptionworkingHours: Subscription;

  workingHours = [];
  hourlyWage = null;
  totalHoursFloat = null;
  totalHours = null;
  totalMinutes = null;
  totalDays = null;

  constructor(private wageService: WageService) {}

  ngOnInit(): void {
    this.getData();

    this.subscriptionworkingHours = this.wageService.workingHoursChanged.subscribe(
      (workingHours: any) => {
        this.getData();
      }
    );
  }

  getData() {
    this.workingHours = this.wageService.getWorkingHours();
    this.wageService.setWorkingHoursArray(this.workingHours);
    this.hourlyWage = this.wageService.getHourlyWage();
    this.totalHoursFloat = this.wageService.getTotalHoursFloat();
    this.totalHours = ~~this.totalHoursFloat;
    this.totalMinutes = (this.totalHoursFloat - this.totalHours) * 60;
    this.totalDays = this.workingHours.length;
  }

  ngOnDestroy() {
    this.subscriptionworkingHours.unsubscribe();
  }
}
