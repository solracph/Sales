import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromLeads from "./leads.reducer";
import * as fromLists from './lists.reducer';
import * as fromNotes from './notes.reducer';


export interface State {
    leads: fromLeads.State;
    lists: fromLists.State;
    notes: fromNotes.State;
}

export const reducers: ActionReducerMap<State> = {
    leads: fromLeads.reducer,
    lists: fromLists.reducer,
    notes: fromNotes.reducer
}

//Feature Selector
export const leadsState = createFeatureSelector<State>('leads');