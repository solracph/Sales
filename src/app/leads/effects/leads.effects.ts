import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromLead from '../actions/leads.actions';
import { LeadService } from '../services/lead.service';
import { Lead } from  '../models';

@Injectable()
export class LeadEffects {
  
    constructor(
        private leadService: LeadService,
        private actions$: Actions
    ) { }

    @Effect()
    getLeads$ = this.actions$.pipe(
      ofType<fromLead.LoadLeads>(fromLead.LOAD_LEADS),
      switchMap(() => this.leadService.getLeads()
        .pipe(
          map((leads: Lead[]) => new fromLead.LoadLeadsSuccess(leads)),
          catchError(error => of(new fromLead.LoadLeadsFail(error)))
        )
      ),
    );
}