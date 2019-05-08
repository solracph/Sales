import { Injectable } from "@angular/core";
import { NotesService } from "../services/lead-notes.service";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from "rxjs/operators";
import * as fromNote from '../actions/notes.actions';
import { LeadNote } from "../models/lead-note.model";

@Injectable()
export class NoteEffects {

    constructor(
        private notesService: NotesService,
        private actions$: Actions
    ) { }

    @Effect()
    loadNotes$ = this.actions$.pipe(
      ofType<fromNote.LoadNotes>(fromNote.LOAD_NOTES),
      switchMap(() => this.notesService.getNotes()
        .pipe(
          map((notes: LeadNote[]) => new fromNote.LoadNotesSuccess(notes)),
          catchError(error => of(new fromNote.LoadNotesFail(error)))
        )
      )
    );

    @Effect()
    insertNoteIo$ = this.actions$.pipe(
      ofType<fromNote.InsertNoteIo>(fromNote.INSERT_NOTE_IO),
      map(action => action.payload),
      switchMap((note) => this.notesService.insertNote(note)
        .pipe(
          map((note: LeadNote) => new fromNote.InsertNoteIoSuccess(note)),
          catchError(error => of(new fromNote.InsertNoteIoFail(error)))
        )
      ),
    );

    @Effect()
    insertNoteIoSuccess$ = this.actions$.pipe(
      ofType<fromNote.InsertNoteIoSuccess>(fromNote.INSERT_NOTE_IO_SUCCESS),
      map(action => action.payload),
        map((note) => new fromNote.InsertNote(note))
    );

}