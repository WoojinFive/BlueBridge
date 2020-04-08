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
  isLoading = true;
  subscription: Subscription;
  note_subscription: Subscription;

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

}
