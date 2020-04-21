import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  date: string;
  name: string;
}

@Component({
  selector: 'app-home-dialog',
  templateUrl: 'home-dialog.html',
})
export class StartWorkLogDialog {
  constructor(
    public dialogRef: MatDialogRef<StartWorkLogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
