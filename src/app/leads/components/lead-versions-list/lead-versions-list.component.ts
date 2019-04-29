import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Lead } from '../../models';
import { SelectLead } from '../../actions/leads.actions';

@Component({
  selector: 'app-lead-versions-list',
  templateUrl: './lead-versions-list.component.html',
  styleUrls: ['./lead-versions-list.component.scss'],
})
export class LeadVersionsListComponent implements OnInit {

  @Input() versions : Lead[];
  @Input() selected : Lead;
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  getSelectedClass(version: Lead){
    return version.versionId == this.selected.versionId ? "selected-version" : "";
  }
  onLeadSelection(lead: Lead){
    this.leadSelected.emit(lead);
  }


}
