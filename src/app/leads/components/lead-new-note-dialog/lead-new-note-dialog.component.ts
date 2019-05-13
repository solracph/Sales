import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lead-new-note-dialog',
  templateUrl: './lead-new-note-dialog.component.html',
  styleUrls: ['./lead-new-note-dialog.component.scss']
})
export class LeadNewNoteDialogComponent {

  public  noteForm:  FormGroup;

  constructor(
      public dialogRef: MatDialogRef<LeadNewNoteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }

  ngOnInit() {
    this.noteForm = new FormGroup({
      text: new FormControl(!!this.data ? this.data.text : '')
    });
  }

  onSubmit(){
    if(!!this.data) {
      this.noteForm.value.text != "" 
      ? 
        this.dialogRef.close({
          ...this.noteForm.value, 
          noteId: this.data.noteId
        }) 
      : 
        this.dialogRef.close();
    }else {
      this.dialogRef.close(this.noteForm.value);
    }
   
  }

  onClose(): void {
      this.dialogRef.close();
  }
}
