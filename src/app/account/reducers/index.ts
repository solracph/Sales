import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromUser from './user.reducers';

export interface State {
    user: fromUser.State
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer
}

//Feature Selector
export const accountState = createFeatureSelector<State>('account');