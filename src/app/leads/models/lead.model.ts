import { LeadState } from "./lead-state.enum";
import { LeadEvent } from "./lead-event.model";

export interface Lead {
    leadId: string,
    versionId: string,
    state: LeadState,
    firstName: string;
    lastName: string;
    source: string;
    outcome: string;
    email: string;
    phoneNumber: string;
    address: string;
    reason: string;
    currentPlan: string;
    mbi: string;
    dob: Date;
    versionDate: Date,
    event: LeadEvent
}