import { Action } from '@ngrx/store';
import { LeadNote } from '../models/lead-note.model';

export const LOAD_NOTES = '[Leads] LOAD NOTES';
export const LOAD_NOTES_SUCCESS = '[Leads] LOAD NOTES SUCCESS';
export const LOAD_NOTES_FAIL = '[Leads] LOAD NOTES FAIL';

export class LoadNotes implements Action {
    readonly type = LOAD_NOTES;
}

export class LoadNotesSuccess implements Action {
    readonly type = LOAD_NOTES_SUCCESS;
    constructor(public payload: LeadNote[] ){}
}

export class LoadNotesFail implements Action {
    readonly type = LOAD_NOTES_FAIL;
    constructor(public payload: any ){}
}

export type Actions = 
| LoadNotes
| LoadNotesSuccess
| LoadNotesFail