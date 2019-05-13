import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeadNote } from '../../models/lead-note.model';
import { User } from '../../../account/models/user.model';
import { Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';

@Component({
  selector: 'app-lead-notes-box',
  templateUrl: './lead-notes-box.component.html',
  styleUrls: ['./lead-notes-box.component.scss']
})
export class LeadNotesBoxComponent implements OnInit {

    @Input() notes: LeadNote[];
    @Input() user: User;
    @Input() lead: Lead;
    @Output() newNoteDialog: EventEmitter<Event> = new EventEmitter();
    @Output() editNoteDialog: EventEmitter<Event> = new EventEmitter();

    public leadState = LeadState;
    
    constructor() { }

    ngOnInit() {
    }

    newNote(e): void {
        this.newNoteDialog.emit(e);
    }

    editNote(e){
      this.editNoteDialog.emit(e);
    }

}
