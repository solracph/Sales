import { LeadNote } from "../models/lead-note.model";
import * as fromNote from '../actions/notes.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<LeadNote> {
    loading: boolean,
    error: any
}

export const adapter: EntityAdapter<LeadNote> = createEntityAdapter({
	selectId: (loc: LeadNote) => loc.noteId,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});

export const reducer = (
    state = initialState, 
    action: fromNote.Actions
): State => {
    switch (action.type) {
        case fromNote.LOAD_NOTES_SUCCESS: 
            return {
                ...adapter.addMany( action.payload, state ),
                loading: false
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
  