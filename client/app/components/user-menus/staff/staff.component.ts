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

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  users: User[] = [];
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'department',
    'job_title',
    'chat'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
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
  
        this.ELEMENT_DATA.push(customStaff);
      })

    this.dataSource.paginator = this.paginator;

  }
}
