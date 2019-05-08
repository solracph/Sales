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
        private leadService: NotesService,
        private actions$: Actions
    ) { }

    @Effect()
    LoadSources$ = this.actions$.pipe(
      ofType<fromNote.LoadNotes>(fromNote.LOAD_NOTES),
      switchMap(() => this.leadService.getNotes()
        .pipe(
          map((notes: LeadNote[]) => new fromNote.LoadNotesSuccess(notes)),
          catchError(error => of(new fromNote.LoadNotesFail(error)))
        )
      ),
    );

}