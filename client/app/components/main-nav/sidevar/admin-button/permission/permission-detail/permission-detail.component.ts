import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.css']
})
export class PermissionDetailComponent implements OnInit {
  selectedValue: number;
  selectedRoleValue: string[];
  selectedRoleName: string;

  roleList: string[] = [];
  roleNameList: string[] = [];

  name = 'Heejin Jeon';

  roles: Role[] = [
    {value: 1, viewValue: 'User Administrator'},
    {value: 2, viewValue: 'Accounting Manager'},
    {value: 3, viewValue: 'Schedule Manager'}
  ];

  constructor(public dialogRef: MatDialogRef<PermissionDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.roleList = this.data.employeeInfo.roles;
  }

  onAddedRole(selectedItem) {
    selectedItem = this.selectedValue;

    if (this.roleList.find(ele => ele === selectedItem)) {
      return alert('This role has been already added.');
    }

    this.roleList.push(selectedItem);

  }

  onDiscard(index: number) {
    return this.data.employeeInfo.roles.splice(index, 1) && this.roleList.splice(index, 1);
  }

}
