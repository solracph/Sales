import { Outcome } from "./outcome.model";

export interface LeadEvent {
    eventId: string;
    leadId: string;
    date: Date;
    location: string;
    userName: string;
    outcome: Outcome
}