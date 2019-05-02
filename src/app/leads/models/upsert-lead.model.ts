import { Lead } from ".";
import { Update } from "@ngrx/entity";

export interface UpsertLeads {
    insert: Lead,
    update?: Update<Lead>
}