import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../../shared/user.model';
import { UserService } from '../../../../../../../shared/user.service';
import { ThemePalette } from '@angular/material/core';
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
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  users: any;
  userList: any;
  myControl = new FormControl();
  filteredOptions: Observable<User>;
  people: any[] = [];
  objectIdPeople: any[] = [];
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

    if (this.personName === '' && this.departmentName !== '') {
      const peopleinDepartment = this.users.filter(user => user.employeeInfo.department === this.departmentName);
      const peopleinDepartList = peopleinDepartment.map(person => person.personalInfo.firstName + ' ' + person.personalInfo.lastName);

      if (this.participantValidation(peopleinDepartList)) {
        if (confirm(`Total ${peopleinDepartList.length} person(s) in ${this.departmentName} will be added. Do you want to add?`)) {
          peopleinDepartList.map(person => this.people.push(person));
          this.departmentName = '';
        } else {
          this.departmentName = '';
        }
      }

    }

    if (this.personName !== '' && this.departmentName === '' && this.participantValidation(this.personName)) {
      this.people.push(this.personName);
      this.personName = '';
    }

    if (this.personName !== '' && this.departmentName !== '') {
      alert('Please empty either the person name or department')
    }

  }

  changeNameToObjectId(peopleArray) {
    const peopleList = peopleArray.map(person => {
      return this.users.filter(userData => {
        if (person === userData.personalInfo.firstName + ' ' + userData.personalInfo.lastName) {
          return userData._id
        }
      })
    })

    let finalList = [];

    peopleList.map(person => {
      return finalList.push(person[0]._id)
    })

    return finalList;
  }

  onEmpty(event: any) {
    this.departmentName = '';
    this.personName = '';
  }


  onDiscard(index: number) {
    return this.people.splice(index, 1);
  }

  participantValidation(people) {
    if(!Array.isArray(people)) {
      if (this.people.some(element => element === people)) {
        return alert('The inserted participant already exists.')
      }
      return true;
    } else {
      const duplicatedList = [];
      people.map(person => {
        if (this.people.some(element => element === person)) {
          duplicatedList.push(person);
        }
      })

      if (duplicatedList.length !== 0) {
        return alert(`'${duplicatedList}' is(are) in the list. If you want to add this department, please remove the person(s) in the list first.`)
      }

      return true;
    }

  }

  onAddSchedule(form: NgForm) {
    if (this.people.length === 0) {
      return alert('You must invite at least one person.')
    }

    const type = "meeting";
    const user = this.changeNameToObjectId(this.people);
    const startDate = form.value.input_date;
    const endDate = form.value.input_date;
    const isApproved = true;
    const title = form.value.input_title;
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
