import { Action } from '@ngrx/store';
import { Lead } from '../models';
import { LeadState } from '../models/lead-state.enum';
import { Update } from '@ngrx/entity';
import { UpsertLeads } from '../models/upsert-lead.model';
import { MatSnackBarConfig } from "@angular/material";

export const LOAD_LEADS =  "[Leads] LOAD LEADS";
export const LOAD_LEADS_SUCCESS =  "[Leads] LOAD LEADS SUCCESS";
export const LOAD_LEADS_FAIL =  "[Leads] LOAD LEADS FAIL";

export const LOAD_LEAD_VERSIONS =  "[Leads] LOAD LEAD VERSIONS";
export const LOAD_LEAD_VERSIONS_SUCCESS =  "[Leads] LEAD VERSIONS SUCCESS";
export const LOAD_LEAD_VERSIONS_FAIL =  "[Leads] LEAD VERSIONS FAIL";

export const INSERT_LEAD = "[Leads] INSERT LEAD";
export const UPSERT_LEAD = "[Leads] UPSERT LEAD";
export const UPDATE_LEAD = "[Leads] UPDATE LEAD";
export const UPDATE_LEAD_STATE = "[Leads] UPDATE LEAD STATE";

export const INSERT_LEAD_IO = "[Leads] INSERT LEAD IO";
export const INSERT_LEAD_IO_SUCCESS = "[Leads] INSERT LEAD IO SUCCESS";
export const INSERT_LEAD_IO_FAIL = "[Leads] INSERT LEAD IO FAIL";

export const SELECT_LEAD =  "[Leads] SELECT LEAD";

/* 💩 caca approaching */

export const SNACKBAR_OPEN =  "[SnackBar] SNACKBAR OPEN";
export const SNACKBAR_CLOSE =  "[SnackBar] SNACKBAR CLOSE";

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

export class InsertLead implements Action {
    readonly type = INSERT_LEAD;
    constructor(public payload: { lead: Lead}) { }
}

export class UpsertLead implements Action {
    readonly type = UPSERT_LEAD;
    constructor(public payload: Lead[]) { }
}

export class UpdateLead implements Action {
    readonly type = UPDATE_LEAD;
    constructor(public payload: Update<Lead>) { }
}

export class UpdateLeadState implements Action {
    readonly type = UPDATE_LEAD_STATE;
    constructor(public payload: { id: string, changes:{ state: LeadState }}) { }
}

export class InsertLeadIo implements Action {
    readonly type = INSERT_LEAD_IO;
    constructor(public payload: UpsertLeads) { }
}

export class InsertLeadIoSuccess  implements Action {
    readonly type = INSERT_LEAD_IO_SUCCESS;
    constructor(public payload: UpsertLeads) { }
}

export class InsertLeadIoFail  implements Action {
    readonly type = INSERT_LEAD_IO_FAIL;
    constructor(public payload: any) { }
}
export class SnackbarOpen  implements Action {
    readonly type = SNACKBAR_OPEN;
    constructor(public payload: {message: string, action?: string, config?: MatSnackBarConfig }) { }
}

export class SnackbarClose   implements Action {
    readonly type = SNACKBAR_CLOSE;
}

export type Actions = 
LoadLeads 
| LoadLeadsSuccess 
| LoadLeadsFail
| SelectLead
| LoadLeadVersions
| LoadLeadVersionsSuccess
| LoadLeadVersionsFail
| InsertLead
| UpsertLead
| UpdateLead
| UpdateLeadState
| InsertLeadIo
| InsertLeadIoSuccess
| InsertLeadIoFail
| SnackbarOpen
| SnackbarClose;