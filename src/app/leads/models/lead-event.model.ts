import { Outcome } from "./outcome.model";

export interface LeadEvent {
    //id: string;
    date: Date,
    location: string
    outcome: Outcome
}