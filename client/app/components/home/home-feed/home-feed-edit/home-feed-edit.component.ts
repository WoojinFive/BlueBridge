import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  // _id: string;
  // author: string;
  description: string;
  // date: Date;
  isHighPriority: boolean;
}

@Component({
  selector: 'app-home-feed-edit',
  templateUrl: './home-feed-edit.component.html',
  styleUrls: ['./home-feed-edit.component.css'],
})
export class HomeFeedEditComponent {
  constructor(
    public dialogRef: MatDialogRef<HomeFeedEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
