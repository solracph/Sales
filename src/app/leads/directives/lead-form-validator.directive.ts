import { ValidatorFn, FormGroup, ValidationErrors, NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { Directive } from "@angular/core";

export const EmailPhoneAddressValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const phoneNumber = control.get('phoneNumber');
    const address = control.get('address');

    if( email.value || phoneNumber.value || address.value ){
      if(!email.getError('email')){
          email.setErrors(null)
      }
      phoneNumber.setErrors(null)
      address.setErrors(null)
      return  null
    } else {
      email.setErrors({ 'email-phone-address': true })
      phoneNumber.setErrors({ 'email-phone-address': true })
      address.setErrors({ 'email-phone-address': true })
      return  { 'email-phone-address': true } ;
    }
};

@Directive({
  selector: '[email-phone-address]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LeadFormValidatorDirective, multi: true }]
})
export class LeadFormValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return EmailPhoneAddressValidation(control)
  }
}