import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromLeads from "./leads.reducer";
import * as fromLists from './lists.reducer';
import * as fromNotes from './notes.reducer';
import * as fromEvents from './events.reducer';


export interface State {
    leads: fromLeads.State;
    lists: fromLists.State;
    notes: fromNotes.State;
    events: fromEvents.State
}

export const reducers: ActionReducerMap<State> = {
    leads: fromLeads.reducer,
    lists: fromLists.reducer,
    notes: fromNotes.reducer,
    events: fromEvents.reducer
}

//Feature Selector
export const leadsState = createFeatureSelector<State>('leads');