import {  Actions, LOAD_LEADS, LOAD_LEADS_SUCCESS, LOAD_LEADS_FAIL } from '../actions/leads.actions';
import { Lead } from '../models';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

//#region State definition
export interface State extends EntityState<Lead> {
    selected: string,
    loading: boolean,
    error: any
}

export const adapter: EntityAdapter<Lead> = createEntityAdapter({
	selectId: (loc: Lead) => loc.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selected: null,
    loading: false,
    error: null
});
//#endregion

export const reducer = (
    state = initialState,
    action: Actions
): State => {
    switch (action.type) {
        case LOAD_LEADS:
            return { ...state, loading: true }
        case LOAD_LEADS_SUCCESS:
            return { ...adapter.addAll( action.payload, state ), loading: false }
        case LOAD_LEADS_FAIL:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}