import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Lead } from '../../models';

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

  ngOnChanges(){
    this.versions.sort(function(a:  any,b: any){ 
      return new Date(b.versionDate).getTime() - new Date(a.versionDate).getTime() ;
    })
  }

  ngOnInit() {
  }

  getSelectedClass = (version: Lead)=> 
    version.versionId == (this.selected && this.selected.versionId)
      ? "selected-version" 
      : "";

  orderByDate(){} 
  onLeadSelection = (lead: Lead) => this.leadSelected.emit(lead);
}
