import { LeadNote } from "../models/lead-note.model";
import * as fromNote from '../actions/notes.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<LeadNote> {
    loading: boolean,
    notes: LeadNote[],
    error: any
}

export const adapter: EntityAdapter<LeadNote> = createEntityAdapter({
	selectId: (loc: LeadNote) => loc.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    notes: [],
    error: null
});

export const reducer = (
    state = initialState, 
    action: fromNote.Actions
): State => {
    switch (action.type) {
        case fromNote.LOAD_NOTES_SUCCESS: 
            return {
                ...state,
                notes: action.payload
            };
        case fromNote.LOAD_NOTES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
  