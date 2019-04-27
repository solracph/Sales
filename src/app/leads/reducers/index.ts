import * as fromLeads from "./leads.reducer";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromLists from './lists.reducer';

export interface State {
    leads: fromLeads.State;
    lists: fromLists.State;
}

export const reducers: ActionReducerMap<State> = {
    leads: fromLeads.reducer,
    lists: fromLists.reducer,
}

//Feature Selector
export const leadsState = createFeatureSelector<State>('leads');