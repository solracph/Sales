import { accountState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { adapter } from "../reducers/user.reducers";

export const getUserState = createSelector(
    accountState,
    state => state.user
);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUser,
} = adapter.getSelectors(getUserState);

export const getUser = createSelector(
    getAllUsers,
    users => users[0]
);
