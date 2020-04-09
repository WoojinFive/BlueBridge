import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [];

  setNotes(notes: Note[]) {
    this.notes = notes;
    this.notesChanged.next(this.notes.slice());
  }

  getNotes() {
    return this.notes.slice();
  }


}
