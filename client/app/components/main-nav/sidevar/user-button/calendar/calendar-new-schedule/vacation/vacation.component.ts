import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'client/app/shared/data-storage.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  input_description: string;
  input_startDate: any;
  input_endDate: any;
  userData: any;

  constructor(private DataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  onAddSchedule(form: NgForm) {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const type = "vacation";
    const user = this.userData.userID;
    const startDate = form.value.input_startDate;
    const endDate = form.value.input_endDate;
    const formattedStartDate = startDate.getDate() + '-' + months[startDate.getMonth()] + '-' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '-' + months[endDate.getMonth()] + '-' + endDate.getFullYear();
    const isApproved = false;
    const title = `${this.userData.firstName} ${this.userData.lastName} is on vacation from ${formattedStartDate} to ${formattedEndDate}`;
    const add_description = form.value.input_description;

    console.log(startDate);

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
