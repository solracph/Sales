import { createSelector } from "@ngrx/store";
import { leadsState } from "../reducers";
import { LeadState as ELeadState } from '../models/lead-state.enum';
import { adapter } from "../reducers/leads.reducer";

export const getLeadsState = createSelector(
    leadsState,
    state => state.leads
);

export const {
    selectIds: getLeadIds,
    selectEntities: getLeadEntities,
    selectAll: getAllLeads,
    selectTotal: getTotalLeads,
} = adapter.getSelectors(getLeadsState);


export const getSelected = createSelector(
    getLeadsState,
    state => state.selected
);

export const getSelectedLead = createSelector(
    getLeadEntities,
    getSelected,
    (entities, selected) => entities[selected]
);

export const getAllLeadVersions = createSelector(
    getAllLeads,
    (leads, props) => { 
        //debugger;
        return leads.filter(lead => lead.leadId == props.leadId);
    }
);

export const getMasterLeads = createSelector(
    getAllLeads,
    (state) => state.filter(e => e.state == ELeadState.master)
);

