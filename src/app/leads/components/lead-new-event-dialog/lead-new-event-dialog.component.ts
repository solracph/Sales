import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DateTimeService } from '../../../commons/utilities/date-time.service';

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
  get date() {  return this.eventForm.get('date') as FormControl; }
  get time() {  return this.eventForm.get('time') as FormControl; }

  constructor(
    public dialogRef: MatDialogRef<LeadNewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private atp: AmazingTimePickerService,
    public dts: DateTimeService
  ) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      outcome: new FormControl(!!this.data.event ? this.data.event.outcome : '', [Validators.required]),
      date: new FormControl(!!this.data.event ? new Date(this.data.event.date) : null,[Validators.required]),
      time: new FormControl(!!this.data.event ? this.dts.getFormattedTime(new Date(this.data.event.date)) : '',[Validators.required]),
      location: new FormControl(!!this.data.event ? this.data.event.location: '')
    });
  }

  onClose(): void {
    this.eventForm.reset();
    this.dialogRef.close();
  }

  onSubmit(){

    if(!this.eventForm.invalid) {

      this.date.setValue(
        this.dts.setTime(this.date.value,this.time.value)
      )

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

  timeDialog(){
    const time = this.atp.open({
      time: this.time.value
    });
    time.afterClose().subscribe(time => {

      this.time.setValue(time);
      let date = this.date.value;

        if(date){
          this.date.setValue(
            this.dts.setTime(date,time)
          )
        } else {
          this.date.setValue(
            this.dts.setTime(new Date(),time)
          )
        }
    });
  }

  

 

  
}
