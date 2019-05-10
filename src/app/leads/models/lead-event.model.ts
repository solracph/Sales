export interface LeadEvent {
    eventId: string;
    leadId: string;
    versionId?: string;
    date: Date;
    location: string;
    userName: string;
    outcome: string
}