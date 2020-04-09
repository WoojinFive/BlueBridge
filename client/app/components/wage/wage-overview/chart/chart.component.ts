import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WageService } from '../wage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  subscriptionworkingHours: Subscription;
  workingHours = [];
  workingHoursArray = [];
  dateArray = [];

  barChartOptions: ChartOptions = {};
  barChartLabels: Label[] = [];
  barChartType: ChartType = null;
  barChartLegend = null;
  barChartPlugins = [];
  barChartColors: Color[] = [];

  barChartData: ChartDataSets[] = [];

  constructor(private wageService: WageService) {}

  ngOnInit(): void {
    this.dateArray = this.wageService.getDateArray(1, 31);

    this.workingHours = this.wageService.getWorkingHours();
    this.wageService.setWorkingHoursArray(this.workingHours);
    this.getWorkingHoursArray();

    this.subscriptionworkingHours = this.wageService.workingHoursChanged.subscribe(
      (workingHours: any) => {
        this.workingHours = workingHours;
        this.wageService.setWorkingHoursArray(this.workingHours);
        this.getWorkingHoursArray();

        this.makeChart();
      }
    );

    this.makeChart();
  }

  getWorkingHoursArray() {
    this.workingHoursArray = this.wageService.getWorkingHoursArray();
  }

  makeChart() {
    // chart options
    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              stepSize: 1,
              min: 0,
              max: 15,
            },
          },
        ],
      },
    };
    this.barChartLabels = this.dateArray;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartColors = [
      {
        backgroundColor: '#3F51B5',
      },
    ];

    this.barChartData = [
      { data: this.workingHoursArray, label: 'Working hours', lineTension: 0 },
    ];
  }

  ngOnDestroy() {
    this.subscriptionworkingHours.unsubscribe();
  }
}
