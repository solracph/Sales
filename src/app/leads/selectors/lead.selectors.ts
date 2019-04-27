import { createSelector } from "@ngrx/store";
import { leadsState } from "../reducers";
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

