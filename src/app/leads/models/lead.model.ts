import { LeadState } from "./lead-state.enum";
import { LeadEvent } from "./lead-event.model";
import { v4 as uuid } from 'uuid';

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
    dob: string;
    versionDate: Date,
    event: LeadEvent
}

export function NewLead(): Lead{
    return {
        versionId: uuid(), 
          leadId: uuid(), 
          state: LeadState.new,
          address: "",
          dob: "",
          email: "",
          firstName:"",
          lastName: "",
          mbi: "",
          phoneNumber: "",
          event : {
            date : new Date(),
            location: "",
            note: ""
          },
          outcome: "",
          source: "",
          currentPlan: "",
          reason: "",
          versionDate: new Date()
    }
}


