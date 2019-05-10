import { leadsState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { adapter } from "../reducers/events.reducer";
import { LeadEvent } from '../models/lead-event.model';
import { chain, find } from 'lodash';

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

export const getAllEventsSortByDate = createSelector(
    getAllEvents,
    (events: LeadEvent[]) => { 
        return events.sort(function(a: LeadEvent,b: LeadEvent){ 
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
    }
);

export const getAllLeadEvents = createSelector(
    getAllEventsSortByDate,
    (events, props) => { 
        return events.filter(events => events.leadId == props.leadId);
    }
);

export const getAllLeadEventsByVersion = createSelector(
    getAllEventsSortByDate,
    (events, props) => { 
        return events.filter(events => events.versionId == props.versionId);
    }
);

export const getLastEvents = createSelector(
    getAllEventsSortByDate,
    (events: LeadEvent[]) => { 
        return chain(events)
            .groupBy("leadId")
            .map(function(events, i) {
                return find(events,(e) => { return e.leadId == i});
            }).value();;
    }
);