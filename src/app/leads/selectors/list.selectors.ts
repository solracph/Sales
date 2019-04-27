import { createSelector } from "@ngrx/store";
import { leadsState } from "../reducers";

export const getListsState = createSelector(
    leadsState,
    state => state.lists
);

export const getSources = createSelector(
    getListsState,
    state => state.sources
);

export const getReasons = createSelector(
    getListsState,
    state => state.reasons
);

export const getPlans = createSelector(
    getListsState,
    state => state.plans
);

export const getOutcomes = createSelector(
    getListsState,
    state => state.outcomes
);

