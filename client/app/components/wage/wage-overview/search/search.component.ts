import { Component, OnInit, OnDestroy } from '@angular/core';
import { WageService } from '../wage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  subscriptionworkingHours: Subscription;
  workingHours = [];
  currentWorkingDate = null;
  years = ['2018', '2019', '2020'];

  constructor(private wageService: WageService) {}

  ngOnInit(): void {
    const date = new Date();
    const updateDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    console.log(updateDate);

    this.getData();

    this.subscriptionworkingHours = this.wageService.workingHoursChanged.subscribe(
      (workingHours: any) => {
        this.getData();
      }
    );
  }

  getData() {
    this.workingHours = this.wageService.getWorkingHours();
    if (this.workingHours.length) {
      this.currentWorkingDate = this.workingHours[0].date;
    }
  }

  ngOnDestroy() {
    this.subscriptionworkingHours.unsubscribe();
  }
}
