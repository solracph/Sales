import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, mergeMap, filter } from 'rxjs/operators';
import * as fromLead from '../actions/leads.actions';
import { LeadService } from '../services/lead.service';
import { Lead } from  '../models';
import * as fromLeads from '../reducers/leads.reducer';
import * as query from '../selectors/lead.selectors';
import { Store, select } from '@ngrx/store';
import { version } from 'codemirror';
import { head } from "lodash";
import { debug } from 'util';

@Injectable()
export class LeadEffects {
  
  constructor(
      private leadService: LeadService,
      private actions$: Actions,
      private store: Store<fromLeads.State>,
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

  @Effect()
  getLeadVersions$ = this.actions$.pipe(
    ofType<fromLead.LoadLeadVersions>(fromLead.LOAD_LEAD_VERSIONS),
    map(action => action.payload.leadId),
    switchMap((leadId) => this.leadService.getLeadVersions(leadId)
      .pipe(
        map((leads: Lead[]) => new fromLead.LoadLeadVersionsSuccess({ leadId, leads })),
        catchError(error => of(new fromLead.LoadLeadVersionsFail(error)))
      )
    ),
  );

  @Effect()
  LoadLeadVersionsSuccess$ = this.actions$.pipe(
    ofType<fromLead.LoadLeadVersionsSuccess>(fromLead.LOAD_LEAD_VERSIONS_SUCCESS),
    map(action => action.payload),
    filter(({ leadId, leads }) => leads.length > 0),
    mergeMap(({ leadId, leads }) => of(new fromLead.SelectLead({ id: this.getVersionId(leads, leadId) }))),
  );

  private getVersionId(leads: Lead[], leadId: string): string {
    const lead = leads.filter(i => i.leadId == leadId);
    return lead.length > 0 ? lead[0].versionId : "";
  }
}