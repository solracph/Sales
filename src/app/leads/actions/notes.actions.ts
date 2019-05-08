import { Action } from '@ngrx/store';
import { LeadNote } from '../models/lead-note.model';

export const LOAD_NOTES = '[Leads] LOAD NOTES';
export const LOAD_NOTES_SUCCESS = '[Leads] LOAD NOTES SUCCESS';
export const LOAD_NOTES_FAIL = '[Leads] LOAD NOTES FAIL';

export const INSERT_NOTE = "[Leads] INSERT NOTE";
export const INSERT_NOTE_IO = "[Leads] INSERT NOTE IO";
export const INSERT_NOTE_IO_SUCCESS = "[Leads] INSERT NOTE IO SUCCESS";
export const INSERT_NOTE_IO_FAIL = "[Leads] INSERT NOTE IO FAIL";

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

export class InsertNote implements Action {
    readonly type = INSERT_NOTE;
    constructor(public payload: LeadNote ){}
}

export class InsertNoteIo implements Action {
    readonly type = INSERT_NOTE_IO;
    constructor(public payload: LeadNote ){}
}

export class InsertNoteIoSuccess implements Action {
    readonly type = INSERT_NOTE_IO_SUCCESS;
    constructor(public payload: LeadNote ){}
}

export class InsertNoteIoFail implements Action {
    readonly type = INSERT_NOTE_IO_FAIL;
    constructor(public payload: LeadNote ){}
}

export type Actions = 
| LoadNotes
| LoadNotesSuccess
| LoadNotesFail
| InsertNote
| InsertNoteIo
| InsertNoteIoSuccess
| InsertNoteIoFail