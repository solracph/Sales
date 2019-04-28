import { LeadState } from "./lead-state.enum";

export interface Lead {
    leadId: string,
    versionId: string,
    state: LeadState,

    firstName: string;
    lastName: string;
    source: string;
    outcome: string;
    email: string;
    address: string;
    reason: string;
    currentPlan: string;
    mbi: string;
    dob: string;
}