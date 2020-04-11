import { Component, OnInit } from '@angular/core';
import { User } from 'client/app/shared/user.model';
import { UserService } from 'client/app/shared/user.service';
import { DataStorageService } from 'client/app/shared/data-storage.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  displayedColumns: string[] = [ 'department', 'job', 'condition'];
  userData: any;
  users: User[] = [];
  loggedInUser: any;
  userDepartment: string;
  userPosition: string;
  userCondition: string;

  constructor(private UserService: UserService, private DataStorageService: DataStorageService) { }

  ngOnInit(): void {
    // this.DataStorageService.fetchUsers().subscribe();
    // this.userData = JSON.parse(localStorage.getItem('userData'));
    // console.log(this.userData);
    // this.users = this.UserService.getUsers();
    // console.log(this.users);
    // this.loggedInUser = this.users.filter(user => user._id === this.userData.userID);
    // this.userDepartment = this.loggedInUser[0].employeeInfo.department;
    // this.userPosition = this.loggedInUser[0].employeeInfo.position;
    // this.userCondition = this.loggedInUser[0].condition;
  }

  ELEMENT_DATA= [
    {  department: 'Default' , job: 'Default', condition: 'Normal'},
  ]
  condition_options = [ "Busy", "Away", "Normal" ]
  selected = this.ELEMENT_DATA[0].condition;
}
