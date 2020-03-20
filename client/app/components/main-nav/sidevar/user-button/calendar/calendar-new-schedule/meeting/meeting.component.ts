import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../../shared/user.model';
import { UserService } from '../../../../../../../shared/user.service';
import { Observable } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { DataStorageService } from 'client/app/shared/data-storage.service';

interface departments {
  viewValue: any;
}

interface userList {
  name: string;
  department: string;
}

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  users: any;
  userList: any;
  myControl = new FormControl();
  filteredOptions: Observable<User>;
  people: any[] = [];
  departments = [
    // {viewValue: ''}
    // {value: 1, viewValue: 'Web Development'},
    // {value: 2, viewValue: 'Project Management'},
    // {value: 3, viewValue: 'Data Analyst'}
  ];
  selectedPeople: any;
  personName: string = '';
  departmentName: string = '';
  input_title: string;
  input_description: string;
  input_date: any;
  input_time: any;
  input_where: string;



  constructor(private UserSerivce: UserService, private DataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.users = this.UserSerivce.getUsers();

    this.userList = this.users.map(user => {
      return {
      name: user.personalInfo.firstName + " " + user.personalInfo.lastName,
      department: user.employeeInfo.department
      }
    });

    const departmentList = this.userList.map(user => {
      return {
        viewValue: user.department
      }
    })

    const uniqueDepartmentList = [... new Set(departmentList.map(dp => dp.viewValue))];

    const customUniqueDptList = uniqueDepartmentList.map(dp => {
      return {
        viewValue: dp
      }
    })

    customUniqueDptList.map(data => this.departments.push(data));

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(option => option ? this._filter(option) : this.userList.slice())
      );
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.userList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onInvite(event: any) {
    if (this.personName === '' && this.departmentName === '') {
      return alert('Please enter a person name or selet a department.')    
    }

    if (this.personName === '' && this.departmentName !== '' && this.participantValidation()) {
      this.people.push(this.departmentName);
      this.departmentName = '';
    }

    if (this.personName !== '' && this.departmentName === '' && this.participantValidation()) {
      this.people.push(this.personName);
      this.personName = '';
    }

    if (this.personName !== '' && this.departmentName !== '') {
      alert('Please empty either the person name or department')
    }

  }

  onEmpty(event: any) {
    this.departmentName = '';
    this.personName = '';
  }


  onDiscard(index: number) {
    return this.people.splice(index, 1);
  }

  participantValidation() {
    if (this.people.some(element => element === this.personName || element === this.departmentName)) {
      return alert('The inserted participant already exists.')
    }

    if (this.personName && !this.userList.some(x => x.name === this.personName)) return alert('The user name does not exist.');

    return true;
  }

  onAddSchedule(form: NgForm) {
    const type = "meeting";
    const user = this.people;
    const startDate = form.value.input_date;
    const endDate = form.value.input_date;
    const time = form.value.input_time;
    const isApproved = true;
    const title = form.value.input_title;
    const add_description = form.value.input_description;

    const newSchedule = {
      type: type,
      user: user,
      startDate: new Date(startDate + time),
      endDate: new Date(endDate + time),
      isApproved: isApproved,
      title: title,
      description: add_description
    };

    form.reset();
    this.DataStorageService.addNewSchedule(newSchedule);
  }

}
