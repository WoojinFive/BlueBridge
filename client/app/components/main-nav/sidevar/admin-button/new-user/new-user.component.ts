import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'client/app/shared/user.model';
import { UserService } from 'client/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'client/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscription: Subscription;
  input_department: string;
  input_jobTitle: string;
  selectedId: string;
  selectedPerson: any;
  viewable: boolean = false;

  constructor(private UserService: UserService, private DataStorageService: DataStorageService) {}

  ngOnInit(): void {
    console.log(this.viewable);
    this.users = this.UserService.getUsers();
    this.users = this.users.filter(user => !user.isApproved);
    this.subscription = this.UserService.usersChanged.subscribe();
  }

  onApprove(form: NgForm) {
    const department = form.value.input_department;
    const jobTitle = form.value.input_jobTitle;
    const isApproved = true;

    const approvedUser = {
      ...this.selectedPerson[0],
      employeeInfo: {
        roles: this.selectedPerson[0].employeeInfo.roles,
        department: department,
        position: jobTitle
      },
      isApproved: isApproved
    };

    form.reset();
    this.DataStorageService.updateUsers(approvedUser);
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selected(event: MatSelectChange) {
    this.selectedId = event.value;

    this.selectedPerson = this.users.filter(user => user._id === this.selectedId);
  }

  onView() {
    this.viewable = true;
  }
}
