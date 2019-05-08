import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { leadsState } from '../../reducers';
import { v4 as uuid } from 'uuid';

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
  public panelOpenState: boolean;
  
  get f() { return this.leadForm.controls; }
  
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.leadFormInitialization(this.lead);
    this.leadForm.valueChanges.subscribe((form) => {
      this.formValueChanged.emit(Object.assign({}, this.lead, form));
    })  
  }

  leadFormInitialization(lead){
    this.leadForm = new FormGroup({
      firstName: new FormControl({value: lead.firstName, disabled: lead.state != 2}, [Validators.required]),
      lastName: new FormControl({value: lead.lastName, disabled: lead.state != 2}, [Validators.required]),
      source: new FormControl({value: lead.source, disabled: lead.state != 2}),
      outcome: new FormControl({value: lead.outcome, disabled: lead.state != 2}),
      currentPlan: new FormControl({value: lead.currentPlan, disabled: lead.state != 2}),
      email: new FormControl({value: lead.email, disabled: lead.state != 2}, [Validators.email]),
      phoneNumber: new FormControl({value: lead.phoneNumber, disabled: lead.state != 2}),
      secondaryPhone: new FormControl({value: lead.secondaryPhone, disabled: lead.state != 2}),
      address: new FormControl({value: lead.address, disabled: lead.state != 2}),
      reason: new FormControl({value: lead.reason, disabled: lead.state != 2}),
      mbi: new FormControl({value: lead.mbi, disabled: lead.state != 2}),
      dob: new FormControl({value: lead.dob, disabled: lead.state != 2},[Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
      note: new FormGroup({
        noteId: new FormControl(uuid()),
        leadId: new FormControl(lead.leadId),
        date: new FormControl(new Date()),
        text: new FormControl('')
      }),
      event: new FormGroup({
        eventId: new FormControl(uuid()),
        leadId: new FormControl(lead.leadId),
        date: new FormControl(new Date()),
        location: new FormControl('')
      })
    });
  }

  edit(){}

  cancel(){}

  save(){ 
    if(this.leadForm.valid){
      this.leadSaved.emit( Object.assign({},this.lead,this.leadForm.value))
    }
  }
}
