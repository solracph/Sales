import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome } from '../../models';
import { LeadListsService } from '../../services/lead-lists.service';

@Component({
    selector: 'app-lead-events-box',
    templateUrl: './lead-events-box.component.html',
    styleUrls: ['./lead-events-box.component.scss']
})
export class LeadEventsBoxComponent implements OnInit {

    @Input() events: LeadEvent[];
    @Input() outcomes: Outcome[];
    @Output() newEvent: EventEmitter<Event> = new EventEmitter();
  
    constructor(
        public  listService : LeadListsService
    ) { }

    ngOnInit() {
    }

    openDialog(event): void {
        this.newEvent.emit(event);
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
        d.setDate(d.getDate() - 2); 
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
