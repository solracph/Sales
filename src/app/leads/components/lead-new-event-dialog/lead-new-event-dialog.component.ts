import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { LeadEvent } from '../../models/lead-event.model';

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
  ) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      outcome: new FormControl(!!this.data.event ? this.data.event.outcome : '', [Validators.required]),
      date: new FormControl(!!this.data.event ? new Date(this.data.event.date) : null,[Validators.required]),
      location: new FormControl(!!this.data.event ? this.data.event.location: '')
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    if(!this.eventForm.invalid) {
      if(!!this.data.event){
        this.dialogRef.close({
          ...this.eventForm.value,
          eventId : this.data.event.eventId
        });
      } else {
        this.dialogRef.close(this.eventForm.value);
      }
      
    }
  }

  onAutocompleteSelected(result) {
      this.location.setValue(result.formatted_address);
  }

}
