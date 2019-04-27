import { Action } from '@ngrx/store';
import { Lead } from '../models';

export const LOAD_LEADS =  "[Leads] LOAD LEADS"
export const LOAD_LEADS_SUCCESS =  "[Leads] LOAD LEADS SUCCESS"
export const LOAD_LEADS_FAIL =  "[Leads] LOAD LEADS FAIL"

export const SELECT_LEAD =  "[Leads] SELECT LEAD"

export class LoadsLeads implements Action {
    readonly type = LOAD_LEADS;
}

export class LoadsLeadsSuccess implements Action {
    readonly type = LOAD_LEADS_SUCCESS;
    constructor(public payload: Lead[]) { }
}

export class LoadsLeadsFail implements Action {
    readonly type = LOAD_LEADS_FAIL;
    constructor(public payload: any) { }
}

export class SelectLead implements Action {
    readonly type = SELECT_LEAD;
    constructor(public payload: { id: string }) { }
}

export type Actions = 
LoadsLeads 
| LoadsLeadsSuccess 
| LoadsLeadsFail
| SelectLead;