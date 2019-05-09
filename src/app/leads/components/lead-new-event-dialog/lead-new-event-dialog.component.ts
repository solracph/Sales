import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-lead-new-event-dialog',
  templateUrl: './lead-new-event-dialog.component.html',
  styleUrls: ['./lead-new-event-dialog.component.scss']
})
export class LeadNewEventDialogComponent implements OnInit {

  public appearance = Appearance;
  public  eventForm:  FormGroup;
  get f() { return this.eventForm.controls; }
  get location() {  return this.eventForm.get('location') as FormControl; }

  constructor(
    public dialogRef: MatDialogRef<LeadNewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      outcome: new FormControl('', [Validators.required]),
      date: new FormControl('',[Validators.required]),
      location: new FormControl('')
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  addNewEvent(){
    if(!this.eventForm.invalid)
    {
      this.dialogRef.close(this.eventForm.value);
    }
  }

   onAutocompleteSelected(result) {
     this.location.setValue(result.formatted_address);
    console.log('onAutocompleteSelected: ', result.formatted_address);
  }

}
