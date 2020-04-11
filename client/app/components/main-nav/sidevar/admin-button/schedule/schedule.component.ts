import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'client/app/shared/user.model';
import { Schedule } from 'client/app/shared/schedule.model';
import { UserService } from 'client/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'client/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ScheduleService } from 'client/app/shared/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  users: User[] = [];
  schedules: Schedule[] = [];
  subscription: Subscription;
  input_department: string;
  input_jobTitle: string;
  selectedId: string;
  selectedSchedule: any;
  requestedPerson: any;
  viewable: boolean = false;

  constructor(private UserService: UserService, private DataStorageService: DataStorageService, private ScheduleService: ScheduleService) {}

  ngOnInit(): void {
    console.log(this.viewable);

    this.DataStorageService.fetchSchedule().subscribe();

    this.users = this.UserService.getUsers();

    this.schedules = this.ScheduleService.getSchedules();

    this.schedules = this.schedules.filter(schedule => !schedule.isApproved);

    this.subscription = this.UserService.usersChanged.subscribe();
  }

  onApprove() {
    if(confirm("Do you really want to approve this request?")) {
      const approvedSchedule = {
        ...this.selectedSchedule[0],
        isApproved: true
      };
  
      this.DataStorageService.updateSchedule(approvedSchedule);
      window.location.reload();
    }
  }

  onDecline() {
    if(confirm("Do you really want to decline this request?")) {
      this.DataStorageService.deleteSchedule(this.selectedSchedule[0]._id);
      window.location.reload();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selected(event: MatSelectChange) {
    this.selectedId = event.value;

    this.selectedSchedule = this.schedules.filter(schedule => schedule._id === this.selectedId);

    this.requestedPerson = this.users.filter(user => user._id === this.selectedSchedule[0].user[0]);
  }

  onView() {
    this.viewable = true;
  }
}
