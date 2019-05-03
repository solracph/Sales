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
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public dateMask = [/\d/, /\d/, '/',/\d/, /\d/, '/',/\d/, /\d/, /\d/,/\d/];

  get f() { return this.leadForm.controls; }

  constructor() {
  }

  ngOnInit() {
    this.leadFormInitialization(this.lead);
    this.leadForm.valueChanges.subscribe((form) => {
      this.formValueChanged.emit(Object.assign({}, this.lead, form));
    })  
  }

  leadFormInitialization(lead){
    this.leadForm = new FormGroup({
      firstName: new FormControl(lead.firstName, [Validators.required]),
      lastName: new FormControl(lead.lastName, [Validators.required]),
      source: new FormControl(lead.source),
      outcome: new FormControl(lead.outcome),
      currentPlan: new FormControl(lead.currentPlan),
      email: new FormControl(lead.email, [Validators.required,Validators.email]),
      phoneNumber: new FormControl(lead.phoneNumber),
      address: new FormControl(lead.address),
      reason: new FormControl(lead.reason),
      mbi: new FormControl(lead.mbi),
      dob: new FormControl(lead.dob,[Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
      event : new FormGroup({
        date: new FormControl(!!lead.event.date ? new Date(lead.event.date) : null),
        location: new FormControl(lead.event.location),
        note: new FormControl(lead.event.note),
      })
    });
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
