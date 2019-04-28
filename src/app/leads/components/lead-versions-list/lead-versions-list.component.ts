import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lead } from '../../models';

@Component({
  selector: 'app-lead-versions-list',
  templateUrl: './lead-versions-list.component.html',
  styleUrls: ['./lead-versions-list.component.scss']
})
export class LeadVersionsListComponent implements OnInit {

  @Input() versions : Lead[];
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  onLeadSelection(lead: Lead){
    this.leadSelected.emit(lead);
  }


}
