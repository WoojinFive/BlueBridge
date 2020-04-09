import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'client/app/shared/user.service';
import { DataStorageService } from 'client/app/shared/data-storage.service';
import { NoteService } from 'client/app/shared/note.service';
import { Subscription } from 'rxjs';
import { Note } from 'client/app/shared/note.model';

@Component({
  selector: 'app-note-history',
  templateUrl: './note-history.component.html',
  styleUrls: ['./note-history.component.css']
})
export class NoteHistoryComponent implements OnInit, OnDestroy {
  users: any;
  userData: any;
  notes = [];
  filteredNotes = [];
  sortedNotes = [];
  isLoading = true;
  subscription: Subscription;
  note_subscription: Subscription;
  input_date: string = '';
  sortMode: boolean = false;

  constructor(private UserSerivce: UserService, private DataStorageService: DataStorageService, private NoteService: NoteService) { }

  ngOnInit(): void {
    this.users = this.UserSerivce.getUsers();
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.note_subscription = this.DataStorageService.fetchNote().subscribe();

    this.subscription = this.NoteService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.notes = notes;

        this.notes = this.notes.sort((a, b) => {
          // sort descending by date and high priority
          const date1 = new Date(a.date);
          const date2 = new Date(b.date);
          return (
            Number(b.isHighPriority) - Number(a.isHighPriority) ||
            date2.getTime() - date1.getTime()
          );
        });

        this.filteredNotes = this.notes.filter(note => {
          if(note.userId === this.userData.userID) {
            return {
              ...note,
            }
          }
          this.isLoading = false
        });        
      }
    )
  }

  ngOnDestroy() {
    this.note_subscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  onNoteDelete(note) {
    this.isLoading = true;
    this.DataStorageService.deleteMemo(note._id);
  }

  onDateSort(event: any) {    
    this.sortedNotes = [];
    this.sortMode = true;

    const inputDate = new Date(this.input_date);

    const inputDate_dd = inputDate.getDate();
    const inputDate_mm = inputDate.getMonth()+1;
    const inputDate_yyyy = inputDate.getFullYear();

    this.filteredNotes.map(note => {
      const individualNoteDate = new Date(note.date)
      const individualNoteDate_dd = individualNoteDate.getDate();
      const individualNoteDate_mm = individualNoteDate.getMonth()+1;
      const individualNoteDate_yyyy = individualNoteDate.getFullYear();

      if (inputDate_dd === individualNoteDate_dd && inputDate_mm === individualNoteDate_mm && inputDate_yyyy === individualNoteDate_yyyy) {
        this.sortedNotes.push(note);
      }
    })

    if (this.sortedNotes.length === 0) {
      alert("No memo on the day you searched.")
    }
  }

  onRefresh(event: any) {
    this.input_date = '';
    this.sortMode = false;
  }

}
