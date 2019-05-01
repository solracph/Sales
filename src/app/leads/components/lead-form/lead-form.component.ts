import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { leadsState } from '../../reducers';

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
  @Output() formValueChanged: EventEmitter<Lead> = new EventEmitter();

  public leadState = LeadState;
  public leadForm: FormGroup;


  constructor() {
  }

  ngOnInit() {
    this.leadFormInitialization();
  }

  leadFormInitialization(){
    this.leadForm = new FormGroup({
      firstName: new FormControl(this.lead.firstName, [Validators.required]),
      lastName: new FormControl(this.lead.lastName, [Validators.required]),
      source: new FormControl(this.lead.source),
      outcome: new FormControl(this.lead.outcome),
      currentPlan: new FormControl(this.lead.currentPlan),
      email: new FormControl(this.lead.email, [Validators.required]),
      phoneNumber: new FormControl(this.lead.phoneNumber),
      address: new FormControl(this.lead.address),
      reason: new FormControl(this.lead.reason),
      mbi: new FormControl(this.lead.mbi),
      dob: new FormControl(this.lead.dob),
      eventDate: new FormControl(this.lead.event.date),
      eventLocation: new FormControl(this.lead.event.location),
      eventNote: new FormControl(this.lead.event.note),
    });

    this.leadForm.valueChanges.subscribe((form) => {
      this.formValueChanged.emit(Object.assign({}, this.lead, form));
    })  
  }

  edit(){}

  cancel(){}

  save(){
    if(this.leadForm.valid){
      this.leadSaved.emit(
        Object.assign({}, this.lead, this.leadForm.value)
      );
    }
  }

}
