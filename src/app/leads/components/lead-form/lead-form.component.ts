import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {

  @Input() lead: Lead;
  @Input() sources : Source[];
  @Input() reasons : Reason[];
  @Input() plans : Plan[];
  @Input() outcomes: Outcome[];

  @Output() leadSaved: EventEmitter<Lead> = new EventEmitter();

  public leadState = LeadState;

  constructor() { }

  ngOnInit() {}

  edit(){}

  cancel(){}

  save(){
    //this.leadSaved.emit()
  }

}
