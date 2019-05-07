import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lead-new-note-dialog',
  templateUrl: './lead-new-note-dialog.component.html',
  styleUrls: ['./lead-new-note-dialog.component.scss']
})
export class LeadNewNoteDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<LeadNewNoteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onClose(): void {
      this.dialogRef.close();
  }
}
