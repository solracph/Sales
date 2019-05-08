import { Action } from '@ngrx/store';
import { LeadEvent } from '../models/lead-event.model';

export const LOAD_EVENTS = '[Leads] LOAD EVENTS';
export const LOAD_EVENTS_SUCCESS = '[Leads] LOAD EVENTS SUCCESS';
export const LOAD_EVENTS_FAIL = '[Leads] LOAD EVENTS FAIL';

export const INSERT_EVENT = "[Leads] INSERT EVENT";
export const INSERT_EVENT_IO = "[Leads] INSERT EVENT IO";
export const INSERT_EVENT_IO_SUCCESS = "[Leads] INSERT EVENT IO SUCCESS";
export const INSERT_EVENT_IO_FAIL = "[Leads] INSERT EVENT IO FAIL";

export class LoadEvents implements Action {
    readonly type = LOAD_EVENTS;
}

export class LoadEventsSuccess implements Action {
    readonly type = LOAD_EVENTS_SUCCESS;
    constructor(public payload: LeadEvent[] ){}
}

export class LoadEventsFail implements Action {
    readonly type = LOAD_EVENTS_FAIL;
    constructor(public payload: any ){}
}

export class InsertEvent implements Action {
    readonly type = INSERT_EVENT;
    constructor(public payload: LeadEvent ){}
}

export class InsertEventIo implements Action {
    readonly type = INSERT_EVENT_IO;
    constructor(public payload: LeadEvent ){}
}

export class InsertEventIoSuccess implements Action {
    readonly type = INSERT_EVENT_IO_SUCCESS;
    constructor(public payload: LeadEvent ){}
}

export class InsertEventIoFail implements Action {
    readonly type = INSERT_EVENT_IO_FAIL;
    constructor(public payload: LeadEvent ){}
}

export type Actions = 
| LoadEvents
| LoadEventsSuccess
| LoadEventsFail
| InsertEvent
| InsertEventIo
| InsertEventIoSuccess
| InsertEventIoFail