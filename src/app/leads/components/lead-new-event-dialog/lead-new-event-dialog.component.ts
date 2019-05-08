import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lead-new-event-dialog',
  templateUrl: './lead-new-event-dialog.component.html',
  styleUrls: ['./lead-new-event-dialog.component.scss']
})
export class LeadNewEventDialogComponent implements OnInit {

  public  eventForm:  FormGroup;
  get f() { return this.eventForm.controls; }

  constructor(
    public dialogRef: MatDialogRef<LeadNewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
   }

  ngOnInit() {
    this.eventForm = new FormGroup({
      date: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required]),
      outcome: new FormControl('', [Validators.required]),
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

}
