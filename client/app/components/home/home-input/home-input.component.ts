import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HomeFeed } from '../home-feed/home-feed.model';
import { HomeService } from './../home.service';
import { DataStorageService } from './../../../shared/data-storage.service';

@Component({
  selector: 'app-home-input',
  templateUrl: './home-input.component.html',
  styleUrls: ['./home-input.component.css'],
})
export class HomeInputComponent implements OnInit {
  userData: any;
  constructor(
    private homeService: HomeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  onAddFeed(form: NgForm) {
    // const _id = 'ee';
    const author = this.userData.userID;
    const description = form.value.descInput;
    const date = new Date();
    const currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    const isHighPriority = form.value.priorityInput ? true : false;
    // const newFeed = new HomeFeed(author, description, date, isHighPriority); // 나중에 server쓸때 이걸로 바꾸자.
    const newFeed = {
      // _id: _id,
      author: author,
      description: description,
      date: currentDate,
      isHighPriority: isHighPriority,
    };
    // this.homeService.addFeed(newFeed);
    // reset all form input
    form.reset();
    this.dataStorageService.storeFeed(newFeed);
  }
}
