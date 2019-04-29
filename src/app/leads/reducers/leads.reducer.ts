import * as feomLead from '../actions/leads.actions';
import { Lead } from '../models';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

//#region State definition
export interface State extends EntityState<Lead> {
    selected: string,
    loading: boolean,
    error: any
}

export const adapter: EntityAdapter<Lead> = createEntityAdapter({
	selectId: (loc: Lead) => loc.versionId,
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
    action: feomLead.Actions
): State => {
    switch (action.type) {
        case feomLead.LOAD_LEADS:
            return { 
                ...state, 
                loading: true 
            }
        case feomLead.LOAD_LEADS_SUCCESS:
            return { 
                ...adapter.addAll( action.payload, state ), 
                loading: false
             }
        case feomLead.LOAD_LEADS_FAIL:
            return { 
                ...state, 
                error: action.payload, loading: false 
            }
            
        case feomLead.LOAD_LEAD_VERSIONS:
            return { 
                ...state, 
                loading: true 
            }
        case feomLead.LOAD_LEAD_VERSIONS_SUCCESS:
            return { 
                ...adapter.addMany( action.payload, state ), 
                loading: false
            }
        case feomLead.LOAD_LEAD_VERSIONS_FAIL:
            return { 
                ...state, 
                loading: false 
            }

        case feomLead.SELECT_LEAD:{
            //debugger;
            return { 
                ...state, 
                selected: action.payload.id
            }
        }
        default:
            return state;
    }
}