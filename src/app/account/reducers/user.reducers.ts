import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromUser from '../actions/user.actions';
import { User } from "../models/user.model";

export interface State extends EntityState<User> {
    loading: boolean;
    error: any
}

export const adapter: EntityAdapter<User> = createEntityAdapter({
	selectId: (loc: User) => loc.userId,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    loading:  false,
    error: null
});

export const reducer = (
    state = initialState, 
    action: fromUser.Actions
): State => {
    switch (action.type) {
        case fromUser.LOGIN: 
            return {
                ...adapter.addAll( action.payload, state ),
                loading: true
            };
        case fromUser.LOGIN_IO:
            return { 
                ...state,
                loading: true
            }
        case fromUser.LOGIN_IO_SUCCESS:
            return { 
                ...state,
                loading: false
            }
        case fromUser.LOGIN_IO_FAIL:
            return { 
                ...state,
                loading: false
            }
        default:
            return state;
    }
}