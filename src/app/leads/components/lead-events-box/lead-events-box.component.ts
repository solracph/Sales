import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Lead } from '../../models';

@Component({
  selector: 'app-lead-events-box',
  templateUrl: './lead-events-box.component.html',
  styleUrls: ['./lead-events-box.component.scss']
})
export class LeadEventsBoxComponent implements OnInit {

  @Input() lead: Lead;
  @Output() newEvent: EventEmitter<Event> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  openDialog(event): void {
    this.newEvent.emit(event);
  }

}
