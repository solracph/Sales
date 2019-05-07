import { Source, Outcome, Reason, Plan } from '../models';
import * as fromList from '../actions/lists.actions';

export interface State {
  sources: Source[],
  outcomes: Outcome[],
  reasons: Reason[],
  plans: Plan[]
}

export const initialState: State = {
  sources: [],
  outcomes: [],
  reasons: [],
  plans: []
};

export function reducer(state = initialState, {type, payload}): State {
  switch (type) {
    case fromList.LOAD_SOURCES_SUCCESS: 
        return {
            ...state,
            sources: payload
          };
    
    case fromList.LOAD_OUTCOMES_SUCCESS: 
        return {
            ...state,
            outcomes: payload
        };
    
    case fromList.LOAD_REASONS_SUCCESS: 
        return {
            ...state,
            reasons: payload
        };  
    
    case fromList.LOAD_PLANS_SUCCESS: 
        return {
            ...state,
            plans: payload
        };  
    
    default:
        return state;
  }
}
