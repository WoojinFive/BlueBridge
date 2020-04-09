import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'client/app/shared/user.model';
import { UserService } from 'client/app/shared/user.service';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  position: number;
  name: string;
  department: string;
  job_title: string;
  picture: string;
  chat: boolean;
  isLogin: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {
  //   position: 10,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 11,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 13,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 14,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 15,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 16,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 17,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 18,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 19,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 20,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 21,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 22,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 23,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },
  // {
  //   position: 24,
  //   name: 'Heejin Jeon',
  //   department: 'What',
  //   job_title: 'What',
  //   picture: "4",
  //   isLogin: true,
  //   chat: true
  // },

  
];

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'department',
    'job_title',
    'chat'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  constructor(private UserSerivce: UserService) {}

  ngOnInit(): void { 
    this.users = this.UserSerivce.getUsers();
    console.log(this.users);

    this.users.map((user, index) => {
      let customStaff = {
        position: index,
        name: user.personalInfo.firstName + ' ' + user.personalInfo.lastName,
        department: user.employeeInfo.department,
        job_title: user.employeeInfo.position,
        picture: user.personalInfo.picture,
        isLogin: user.isLogin,
        chat: true
      }

      ELEMENT_DATA.push(customStaff);
    })

    this.dataSource.paginator = this.paginator;

  }
}
