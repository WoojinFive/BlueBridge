import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'client/app/shared/data-storage.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  input_title: string;
  input_description: string;
  input_date: any;
  userData: any;

  constructor(private DataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  onAddSchedule(form: NgForm) {
    const type = "event";
    const user = this.userData.userID;
    const startDate = form.value.input_date;
    const endDate = form.value.input_date;
    const isApproved = true;
    const title = form.value.input_title;
    const add_description = form.value.input_description;

    const newSchedule = {
      type: type,
      user: user,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isApproved: isApproved,
      title: title,
      description: add_description
    };

    form.reset();
    this.DataStorageService.addNewSchedule(newSchedule);
  }

}
