import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome } from '../../models';

@Component({
    selector: 'app-lead-events-box',
    templateUrl: './lead-events-box.component.html',
    styleUrls: ['./lead-events-box.component.scss']
})
export class LeadEventsBoxComponent implements OnInit {

    @Input() events: LeadEvent[];
    @Output() newEvent: EventEmitter<Event> = new EventEmitter();
  
    constructor() { }

    ngOnInit() {
    }

    openDialog(event): void {
        this.newEvent.emit(event);
    }

}
