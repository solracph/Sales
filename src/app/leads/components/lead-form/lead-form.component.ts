import { Component, OnInit, Input, Output, EventEmitter, Directive } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';


export const atleastOneDemographic: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const phoneNumber = control.get('phoneNumber');
    const address = control.get('address');

    if( email.value || phoneNumber.value || address.value  ){
      if(!email.getError('email'))
      email.setErrors(null)
      phoneNumber.setErrors(null)
      address.setErrors(null)
      return  null
    } else {
      email.setErrors({ 'atleastOneDemographic': true })
      phoneNumber.setErrors({ 'atleastOneDemographic': true })
      address.setErrors({ 'atleastOneDemographic': true })
      return  { 'atleastOneDemographic': true } ;
    }
};

@Directive({
  selector: '[atleastOneDemographic]',
  providers: [{ provide: NG_VALIDATORS, useExisting: atleastOneDemographicValidatorDirective, multi: true }]
})
export class atleastOneDemographicValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return atleastOneDemographic(control)
  }
}

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
  public isSubmitted : boolean = false;
  
  get f() { return this.leadForm.controls; }
  get eventDate() {  return this.leadForm.get('event.date') as FormControl; }
  get outcome() {  return this.leadForm.get('outcome') as FormControl; }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  
    this.leadFormInitialization(this.lead);
    console.log(this.leadForm)
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
      email: new FormControl({value: lead.email, disabled: lead.state != 2} , [Validators.email]),
      phoneNumber: new FormControl({value: lead.phoneNumber, disabled: lead.state != 2},),
      secondaryPhone: new FormControl({value: lead.secondaryPhone, disabled: lead.state != 2}),
      address: new FormControl({value: lead.address, disabled: lead.state != 2},),
      reason: new FormControl({value: lead.reason, disabled: lead.state != 2}),
      mbi: new FormControl({value: lead.mbi, disabled: lead.state != 2}),
      dob: new FormControl({value: lead.dob, disabled: lead.state != 2},[Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
      note: new FormGroup({
        noteId: new FormControl(uuid()),
        leadId: new FormControl(lead.leadId),
        date: new FormControl(new Date()),
        text: new FormControl('')
      }),
      event: new FormGroup({
        eventId: new FormControl(uuid()),
        leadId: new FormControl(lead.leadId),
        date: new FormControl(null),
        location: new FormControl('')
      })
    },{ validators: atleastOneDemographic });

    this.outcome.valueChanges.subscribe(value => {
      if (value) {
        this.eventDate.setValidators([Validators.required]);
      } else {
        this.eventDate.setValidators(null);
      }
      this.eventDate.updateValueAndValidity();
    });
  }

  save(){ 
    this.isSubmitted = true;
    if(this.leadForm.valid) {
       this.leadSaved.emit( Object.assign({},this.lead,this.leadForm.value))
    }
  }

}
