import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lead } from '../../models';

@Component({
  selector: 'app-lead-notes-box',
  templateUrl: './lead-notes-box.component.html',
  styleUrls: ['./lead-notes-box.component.scss']
})
export class LeadNotesBoxComponent implements OnInit {

  @Input() lead: Lead;
  @Output() newNote: EventEmitter<Event> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  openDialog(event): void {
    this.newNote.emit(event);
  }

}
