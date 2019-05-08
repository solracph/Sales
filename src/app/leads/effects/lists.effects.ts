import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromList from '../actions/lists.actions';
import { LeadListsService } from '../services/lead-lists.service';
import { Source, Outcome, Plan } from '../models';

@Injectable()
export class ListEffects {

    constructor(
        private leadListsService: LeadListsService,
        private actions$: Actions,
        //private store: Store<LeadState>
      ) {}
    

    @Effect()
    LoadAllLists$ = this.actions$.pipe(
      ofType<fromList.LoadAllLists>(fromList.LOAD_ALL_LISTS),
      switchMap(() => [
        new fromList.LoadSources(),
        new fromList.LoadOutcomes(),
        new fromList.LoadReasons(),
        new fromList.LoadPlans(),
      ])
    );

    @Effect()
    LoadSources$ = this.actions$.pipe(
      ofType<fromList.LoadSources>(fromList.LOAD_SOURCES),
      switchMap(() => this.leadListsService.getSources()
        .pipe(
          map((sources: Source[]) => new fromList.LoadSourcesSuccess(sources)),
          catchError(error => of(new fromList.LoadSourcesFail(error)))
        )
      ),
    );

    @Effect()
    LoadOutcomes$ = this.actions$.pipe(
      ofType<fromList.LoadOutcomes>(fromList.LOAD_OUTCOMES),
      switchMap(() => this.leadListsService.getOutcomes()
        .pipe(
          map((outcome: Outcome[]) => new fromList.LoadOutcomesSuccess(outcome)),
          catchError(error => of(new fromList.LoadOutcomesFail(error)))
        )
      ),
    );

    @Effect()
    LoadReasons$ = this.actions$.pipe(
      ofType<fromList.LoadReasons>(fromList.LOAD_REASONS),
      switchMap(() => this.leadListsService.getReasons()
        .pipe(
          map((outcome: Outcome[]) => new fromList.LoadReasonsSuccess(outcome)),
          catchError(error => of(new fromList.LoadReasonsFail(error)))
        )
      ),
    );

    @Effect()
    LoadPlans$ = this.actions$.pipe(
      ofType<fromList.LoadPlans>(fromList.LOAD_PLANS),
      switchMap(() => this.leadListsService.getPlans()
        .pipe(
          map((plan: Plan[]) => new fromList.LoadPlansSuccess(plan)),
          catchError(error => of(new fromList.LoadPlansFail(error)))
        )
      ),
    );
}