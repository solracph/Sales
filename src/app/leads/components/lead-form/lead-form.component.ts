import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
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
  public panelOpenState: boolean;
  
  get f() { return this.leadForm.controls; }
  get events(): FormArray { return this.leadForm.get('events') as FormArray; }
  get notes(): FormArray { return this.leadForm.get('notes') as FormArray; }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.leadFormInitialization(this.lead);
    this.leadForm.valueChanges.subscribe((form) => {
      this.formValueChanged.emit(Object.assign({}, this.lead, form));
    })  
    this.leadForm.get('outcome').valueChanges.subscribe( () => {
        if(this.lead.state == this.leadState.new ){
            
            this.leadForm.controls.notes = new FormArray([]);
            this.leadForm.controls.events = new FormArray([]);

            const notes = this.leadForm.controls.notes as FormArray;
            const events = this.leadForm.controls.events as FormArray;
            notes.push(new FormGroup({
              date: new FormControl(new Date()),
              userName: new FormControl(this.lead.firstName),
              text: new FormControl('')
            }))
      
            events.push( new FormGroup({
              date: new FormControl(new Date()),
              location: new FormControl('')
            }))
        }
    });
  }

  leadFormInitialization(lead){
    this.leadForm = new FormGroup({
      firstName: new FormControl(lead.firstName, [Validators.required]),
      lastName: new FormControl(lead.lastName, [Validators.required]),
      source: new FormControl(lead.source),
      outcome: new FormControl(lead.outcome),
      currentPlan: new FormControl(lead.currentPlan),
      email: new FormControl(lead.email, [Validators.email]),
      phoneNumber: new FormControl(lead.phoneNumber),
      secondaryPhone: new FormControl(lead.secondaryPhone),
      address: new FormControl(lead.address),
      reason: new FormControl(lead.reason),
      mbi: new FormControl(lead.mbi),
      dob: new FormControl(lead.dob,[Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
      events : new FormArray([]),
      notes : new FormArray([])
    });
  }

  edit(){}

  cancel(){}

  save(){ 
    if(this.leadForm.valid){
      if(this.lead.state == this.leadState.new){
        this.leadSaved.emit( Object.assign({},this.lead,this.leadForm.value))
      }else{
        debugger
        this.leadForm.value.notes = _.merge(this.leadForm.value.notes,this.lead.notes)
        this.leadForm.value.events = _.merge(this.leadForm.value.events,this.lead.events)
        this.leadSaved.emit(Object.assign({},this.lead,this.leadForm.value))
      }
    }
  }
}
