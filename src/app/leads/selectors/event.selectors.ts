import { leadsState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { adapter } from "../reducers/events.reducer";

export const getEventsState = createSelector(
    leadsState,
    state => state.events
);

export const {
    selectIds: getEventIds,
    selectEntities: getEventEntities,
    selectAll: getAllEvents,
    selectTotal: getTotalEvent,
} = adapter.getSelectors(getEventsState);

export const getAllLeadEvents = createSelector(
    getAllEvents,
    (events, props) => { 
        return events.filter(events => events.leadId == props.leadId);
    }
);