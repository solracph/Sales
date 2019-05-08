import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeadNote } from '../../models/lead-note.model';

@Component({
  selector: 'app-lead-notes-box',
  templateUrl: './lead-notes-box.component.html',
  styleUrls: ['./lead-notes-box.component.scss']
})
export class LeadNotesBoxComponent implements OnInit {

  @Input() notes: LeadNote[];
  @Output() newNote: EventEmitter<Event> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  openDialog(event): void {
    this.newNote.emit(event);
  }

}
