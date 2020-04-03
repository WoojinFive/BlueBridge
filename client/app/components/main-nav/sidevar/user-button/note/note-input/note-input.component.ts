import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'client/app/shared/user.service';
import { DataStorageService } from 'client/app/shared/data-storage.service';
import { NoteService } from 'client/app/shared/note.service';

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css']
})
export class NoteInputComponent implements OnInit {
  userData: any;
  input_memo: string;

  constructor(private UserSerivce: UserService, private DataStorageService: DataStorageService, private NoteService: NoteService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  onAddMemo(form: NgForm) {
    const userId = this.userData.userID;
    const memoInput = form.value.input_memo;
    const memoDate = new Date();
    const isHighPriority = form.value.priorityInput ? true : false;

    const newMemo = {
      userId: userId,
      description: memoInput,
      date: memoDate,
      isHighPriority: isHighPriority
    };

    form.reset();
    this.DataStorageService.addNewMemo(newMemo);
  }

}
