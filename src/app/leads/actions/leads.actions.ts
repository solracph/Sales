import { Action } from '@ngrx/store';
import { Lead } from '../models';
import { LeadState } from '../models/lead-state.enum';

export const LOAD_LEADS =  "[Leads] LOAD LEADS";
export const LOAD_LEADS_SUCCESS =  "[Leads] LOAD LEADS SUCCESS";
export const LOAD_LEADS_FAIL =  "[Leads] LOAD LEADS FAIL";

export const LOAD_LEAD_VERSIONS =  "[Leads] LOAD LEAD VERSIONS";
export const LOAD_LEAD_VERSIONS_SUCCESS =  "[Leads] LEAD VERSIONS SUCCESS";
export const LOAD_LEAD_VERSIONS_FAIL =  "[Leads] LEAD VERSIONS FAIL";

export const SET_LEAD_STATE = "[Leads] SET LEAD STATE";

export const SELECT_LEAD =  "[Leads] SELECT LEAD";

export class LoadLeads implements Action {
    readonly type = LOAD_LEADS;
}

export class LoadLeadsSuccess implements Action {
    readonly type = LOAD_LEADS_SUCCESS;
    constructor(public payload: Lead[]) { }
}

export class LoadLeadsFail implements Action {
    readonly type = LOAD_LEADS_FAIL;
    constructor(public payload: any) { }
}

export class LoadLeadVersions implements Action {
    readonly type = LOAD_LEAD_VERSIONS;
    constructor(public payload: { leadId: string }) { }
}

export class LoadLeadVersionsSuccess implements Action {
    readonly type = LOAD_LEAD_VERSIONS_SUCCESS;
    constructor(public payload: { leadId: string, leads: Lead[] }) { }
}

export class LoadLeadVersionsFail implements Action {
    readonly type = LOAD_LEAD_VERSIONS_FAIL;
    constructor(public payload: any) { }
}


export class SelectLead implements Action {
    readonly type = SELECT_LEAD;
    constructor(public payload: { id: string }) { }
}

export type Actions = 
LoadLeads 
| LoadLeadsSuccess 
| LoadLeadsFail
| SelectLead
| LoadLeadVersions
| LoadLeadVersionsSuccess
| LoadLeadVersionsFail;