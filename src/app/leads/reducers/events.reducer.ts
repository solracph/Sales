import { LeadEvent } from "../models/lead-event.model";
import * as fromEvent from '../actions/event.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<LeadEvent> {
    loading: boolean,
    error: any
}

export const adapter: EntityAdapter<LeadEvent> = createEntityAdapter({
	selectId: (loc: LeadEvent) => loc.eventId,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});


export const reducer = (
    state = initialState, 
    action: fromEvent.Actions
): State => {
    switch (action.type) {
        case fromEvent.LOAD_EVENTS_SUCCESS: 
            return {
                ...adapter.addMany( action.payload, state ),
                loading: false
            };
        case fromEvent.LOAD_EVENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case fromEvent.INSERT_EVENT:
            return {
                ...adapter.addOne( action.payload, state ),
                loading: true
            }
        case fromEvent.INSERT_EVENT_IO:
            return {
                ...state,
                loading: true
            }
        case fromEvent.INSERT_EVENT_IO_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case fromEvent.INSERT_EVENT_IO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}