import { Component, OnInit, Input, Output, EventEmitter, Directive, SimpleChange } from '@angular/core';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { v4 as uuid } from 'uuid';
import { EmailPhoneAddressValidation } from '../../directives/lead-form-validator.directive';
import { User } from '../../../account/models/user.model';

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
  @Input() user: User;

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
  get address() {  return this.leadForm.get('address') as FormControl; }
  get location() {  return this.leadForm.get('event.location') as FormControl; }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.leadFormInitialization();
    this.leadForm.valueChanges.subscribe((form) => {
      this.formValueChanged.emit(Object.assign({}, this.lead, form));
    })  
  }

  ngOnChanges(changes){
    if(!!changes.lead)
      this.leadFormInitialization();
  }

  leadFormInitialization(){
    this.leadForm = new FormGroup({
      firstName: new FormControl({value: this.lead.firstName, disabled: this.isDisable()}, [Validators.required]),
      lastName: new FormControl({value: this.lead.lastName, disabled: this.isDisable()}, [Validators.required]),
      source: new FormControl({value: this.lead.source, disabled: this.isDisable()}),
      outcome: new FormControl({value: this.lead.outcome, disabled: this.isDisable()}),
      currentPlan: new FormControl({value: this.lead.currentPlan, disabled: this.isDisable()}),
      email: new FormControl({value: this.lead.email, disabled: this.isDisable()} , [Validators.email]),
      phoneNumber: new FormControl({value: this.lead.phoneNumber, disabled: this.isDisable()},),
      secondaryPhone: new FormControl({value: this.lead.secondaryPhone, disabled: this.isDisable()}),
      address: new FormControl({value: this.lead.address, disabled: this.isDisable()},),
      reason: new FormControl({value: this.lead.reason, disabled: this.isDisable()}),
      mbi: new FormControl({value: this.lead.mbi, disabled: this.isDisable()}),
      dob: new FormControl({value: this.lead.dob, disabled: this.isDisable()},[Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
      note: new FormGroup({
        noteId: new FormControl(uuid()),
        leadId: new FormControl(this.lead.leadId),
        date: new FormControl(new Date()),
        text: new FormControl('')
      }),
      event: new FormGroup({
        eventId: new FormControl(uuid()),
        leadId: new FormControl(this.lead.leadId),
        date: new FormControl(null),
        location: new FormControl('')
      })
    },{ validators: EmailPhoneAddressValidation });

    this.outcome.valueChanges.subscribe(value => {
      if (value) {
        this.eventDate.setValidators([Validators.required]);
      } else {
        this.eventDate.setValidators(null);
      }
      this.eventDate.updateValueAndValidity();
    });
  }

  isDisable(){
    return this.lead.state != 2
  }

  save(){ 
    this.isSubmitted = true;
    if(this.leadForm.valid) {
       this.leadSaved.emit( Object.assign({},this.lead,this.leadForm.value))
    }
  }

  onAutocompleteAddress(result) {
    this.address.setValue(result.formatted_address);
  }

  onAutocompleteLocation(result) {
    this.location.setValue(result.formatted_address);
  }

}
