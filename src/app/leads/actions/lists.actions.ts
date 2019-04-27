import { Action } from '@ngrx/store';
import { Source, Outcome, Reason, Plan } from '../models';

export const LOAD_ALL_LISTS = '[Leads] LOAD ALL LISTS';

export const LOAD_SOURCES = '[Leads] LOAD SOURCES';
export const LOAD_SOURCES_SUCCESS = '[Leads] LOAD SOURCES SUCCESS';
export const LOAD_SOURCES_FAIL = '[Leads] LOAD SOURCES FAIL';

export const LOAD_OUTCOMES = '[Leads] LOAD OUTCOMES';
export const LOAD_OUTCOMES_SUCCESS = '[Leads] LOAD OUTCOMES SUCCESS';
export const LOAD_OUTCOMES_FAIL = '[Leads] LOAD OUTCOMES FAIL';

export const LOAD_REASONS = '[Leads] LOAD REASONS';
export const LOAD_REASONS_SUCCESS = '[Leads] LOAD REASONS SUCCESS';
export const LOAD_REASONS_FAIL = '[Leads] LOAD REASONS FAIL';

export const LOAD_PLANS = '[Leads] LOAD PLANS';
export const LOAD_PLANS_SUCCESS = '[Leads] LOAD PLANS SUCCESS';
export const LOAD_PLANS_FAIL = '[Leads] LOAD PLANS FAIL';

export class LoadAllLists implements Action {
    readonly type = LOAD_ALL_LISTS;
}

export class LoadSources implements Action {
    readonly type = LOAD_SOURCES;
}

export class LoadSourcesSuccess implements Action {
    readonly type = LOAD_SOURCES_SUCCESS;
    constructor(public payload: Source[] ){}
}

export class LoadSourcesFail implements Action {
    readonly type = LOAD_SOURCES_FAIL;
    constructor(public payload: any ){}
}

export class LoadOutcomes implements Action {
    readonly type = LOAD_OUTCOMES;
}

export class LoadOutcomesSuccess implements Action {
    readonly type = LOAD_OUTCOMES_SUCCESS;
    constructor(public payload: Outcome[] ){}
}

export class LoadOutcomesFail implements Action {
    readonly type = LOAD_OUTCOMES_FAIL;
    constructor(public payload: any ){}
}

export class LoadReasons implements Action {
    readonly type = LOAD_REASONS;
}

export class LoadReasonsSuccess implements Action {
    readonly type = LOAD_REASONS_SUCCESS;
    constructor(public payload: Reason[] ){}
}

export class LoadReasonsFail implements Action {
    readonly type = LOAD_REASONS_FAIL;
    constructor(public payload: any ){}
}

export class LoadPlans implements Action{
    readonly type = LOAD_PLANS;
}

export class LoadPlansSuccess implements Action{
    readonly type = LOAD_PLANS_SUCCESS;
    constructor(public payload: Plan[] ) {}
}

export class LoadPlansFail implements Action{
    readonly type = LOAD_PLANS_FAIL;
    constructor(public payload: any) {}
}

export type Actions = 
| LoadAllLists
| LoadSources
| LoadSourcesSuccess
| LoadSourcesFail
| LoadOutcomes
| LoadOutcomesSuccess
| LoadOutcomesFail
| LoadReasons 
| LoadReasonsSuccess 
| LoadReasonsFail
| LoadPlans 
| LoadPlansSuccess
| LoadPlansFail;

