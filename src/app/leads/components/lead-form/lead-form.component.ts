import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public leadForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.leadFormInitialization();
  }

  leadFormInitialization(){
    this.leadForm = this.formBuilder.group({
      firstName: [this.lead.firstName,[Validators.required]],
      lastName: [this.lead.lastName,[Validators.required]],
      source: [this.lead.source,[Validators.required]],
      outcome: [this.lead.outcome,[Validators.required]],
      currentPlan: [this.lead.currentPlan,[Validators.required]],
      email: [this.lead.email,[Validators.required]],
      phoneNumber: [this.lead.phoneNumber],
      address: [this.lead.address,[Validators.required]],
      reason: [this.lead.reason,[Validators.required]],
      mbi: [this.lead.mbi,[Validators.required]],
      dob: [this.lead.dob,[Validators.required]],
      event : this.formBuilder.group({
        date: [this.lead.event.date],
        location: [this.lead.event.location],
        note: [this.lead.event.note]
      })
    });
  }

  edit(){}

  cancel(){}

  save(){
    //this.leadSaved.emit()
  }

}
