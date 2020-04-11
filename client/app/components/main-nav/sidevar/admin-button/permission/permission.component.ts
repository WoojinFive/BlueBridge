import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'client/app/shared/user.model';
import { UserService } from 'client/app/shared/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import { DataStorageService } from 'client/app/shared/data-storage.service';

export interface PeriodicElement {
  position: number;
  name: string;
  department: string;
  job_title: string;
  roles: string[];
  picture: string;
  chat: boolean;
  isLogin: boolean;
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
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

  constructor(private UserSerivce: UserService, private DataStorageService: DataStorageService, public dialog: MatDialog) {}

  ngOnInit(): void { 
    this.users = this.UserSerivce.getUsers();
      this.users.map((user, index) => {
        if(user.isApproved) {
          let customStaff = {
            ...user,
            position: index,
            name: user.personalInfo.firstName + ' ' + user.personalInfo.lastName,
            department: user.employeeInfo.department,
            job_title: user.employeeInfo.position,
            roles: user.employeeInfo.roles,
            picture: user.personalInfo.picture,
            isLogin: user.isLogin,
            chat: true
          }
    
          this.ELEMENT_DATA.push(customStaff);
        }

      })

    this.dataSource.paginator = this.paginator;

  }

  onUpdateUser(user) {
    this.DataStorageService.updateUsers(user);
  }

  openDialog(user): void {
    const dialogRef = this.dialog.open(PermissionDetailComponent, {
      width: '25%',
      data: {
        ...user
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const updatedUser = {
          _id: user._id,
          personalInfo: user.personalInfo,
          employeeInfo: {
            roles: result.employeeInfo.roles,
            department: user.employeeInfo.department,
            position: user.employeeInfo.position
          },
          workInfo: user.workInfo,
          isLogin: user.isLogin,
          condition: user.condition,
          isApproved: user.isApproved
        };
        this.onUpdateUser(updatedUser);
      }
    });
  }
}
