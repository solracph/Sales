import * as fromLead from '../actions/leads.actions';
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
    action: fromLead.Actions
): State => {
    switch (action.type) {
        //#region load Leads        
        case fromLead.LOAD_LEADS:
            return { 
                ...state, 
                loading: true 
            }

        case fromLead.LOAD_LEADS_SUCCESS:
            return { 
                ...adapter.addMany( action.payload, state ), 
                loading: false
             }

        case fromLead.LOAD_LEADS_FAIL:
            return { 
                ...state, 
                error: action.payload, 
                loading: false 
            }
            
        case fromLead.LOAD_LEAD_VERSIONS:
            return { 
                ...state, 
                loading: true 
            }
            
        case fromLead.LOAD_LEAD_VERSIONS_SUCCESS:
            return { 
                ...adapter.addMany( action.payload.leads, state ), 
                loading: false
            }

        case fromLead.LOAD_LEAD_VERSIONS_FAIL:
            return { 
                ...state, 
                loading: false 
            }
        //#endregion

        //#region List CrUd Operations
        case fromLead.INSERT_LEAD_IO:
            return {
                ...state,
                loading: true
            }
        case fromLead.INSERT_LEAD_IO_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case fromLead.INSERT_LEAD_IO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case fromLead.INSERT_LEAD:
            return { 
                ...adapter.addOne( action.payload.lead, state ),
                selected: action.payload.lead.versionId,
            }

        case fromLead.UPSERT_LEAD:
            return { 
                ...adapter.upsertMany( action.payload, state ),
            }

        case fromLead.UPDATE_LEAD:
            return {
                ...adapter.updateOne(action.payload, state), 
            }
        case fromLead.UPDATE_LEAD_STATE:
            return { 
                ...adapter.updateOne(action.payload, state), 
            }
        //#endregion

        case fromLead.SELECT_LEAD:{
            return { 
                ...state, 
                selected: action.payload.id
            }
        }

        default:
            return state;
    }
}