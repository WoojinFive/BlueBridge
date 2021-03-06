import { Injectable } from '@angular/core';
import moment from 'moment';

import { Subject } from 'rxjs';

import { Work } from './work.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  workChanged = new Subject<Work>();
  public work: Work = {
    date: null,
    workStartTime: null,
    workFinishTime: null,
  };

  constructor() {}

  setWork(work: Work) {
    this.work = work;
    this.workChanged.next(this.work);
  }

  startWork(currentDateTime, currentDate) {
    this.work = {
      ...this.work,
      date: currentDate,
      workStartTime: currentDateTime,
    };

    this.setWork(this.work);

    console.log(this.work);
  }

  finishWork() {
    console.log(this.work);
  }
}
