import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome, Lead } from '../../models';
import { LeadListsService } from '../../services/lead-lists.service';
import { User } from '../../../account/models/user.model';
import { LeadState } from '../../models/lead-state.enum';

@Component({
    selector: 'app-lead-events-box',
    templateUrl: './lead-events-box.component.html',
    styleUrls: ['./lead-events-box.component.scss']
})
export class LeadEventsBoxComponent implements OnInit {

    @Input() events: LeadEvent[];
    @Input() outcomes: Outcome[];
    @Input() user: User;
    @Input() lead: Lead;
    @Output() newEventDialog: EventEmitter<Event> = new EventEmitter();
    @Output() editEventDialog: EventEmitter<LeadEvent> = new EventEmitter();

    public leadState = LeadState;
  
    constructor(
        public  listService : LeadListsService
    ) { }

    ngOnInit() {
    }

    newEvent(e) {
        this.newEventDialog.emit(e);
    }

    editEvent(event : LeadEvent) {
        this.editEventDialog.emit(event);
    }

    eventUrgency(date: Date){
        var now = new Date(); 
        if(this.isPastEvent(date))
        {
            return 'pasts';
        }

        var d = new Date(date); 
        d.setDate(d.getDate() - 1); 
        if(now.getTime() > d.getTime()) 
        {
            return 'oneday';
        }

        var d = new Date(date); 
        new Date(date).setDate(d.getDate() - 2); 
        if(now.getTime() > d.getTime()) 
        {
            return 'twodays';
        }

        return 'upcoming';
    }
   

    isPastEvent(date: Date){
        return new Date(date).getTime() < new Date().getTime(); 
    }

}
