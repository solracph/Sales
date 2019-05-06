import { Outcome } from "./outcome.model";

export interface LeadEvent {
    date: Date,
    location: string
    outcome: Outcome
}