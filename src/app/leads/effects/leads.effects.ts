import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, mergeMap, filter } from 'rxjs/operators';
import * as fromLead from '../actions/leads.actions';
import { LeadService } from '../services/lead.service';
import { Lead } from  '../models';
import * as fromLeads from '../reducers/leads.reducer';
import { Store  } from '@ngrx/store';
import { LeadState } from '../models/lead-state.enum';

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
  loadLeadVersionsSuccess$ = this.actions$.pipe(
    ofType<fromLead.LoadLeadVersionsSuccess>(fromLead.LOAD_LEAD_VERSIONS_SUCCESS),
    map(action => action.payload),
    filter(({ leads }) => leads.length > 0),
    mergeMap(({ leadId, leads }) => of(new fromLead.SelectLead({ id: this.getVersionId(leads, leadId) }))),
  );

  @Effect()
  insertLeadIo$ = this.actions$.pipe(
    ofType<fromLead.InsertLeadIo>(
      fromLead.INSERT_LEAD_IO
    ),
    map(action => action.payload.lead),
    switchMap((lead) => this.leadService.insertLead(lead)
      .pipe(
        map((lead: Lead) => new fromLead.InsertLeadIoSuccess({lead})),
        catchError(error => of(new fromLead.InsertLeadIoFail(error)))
      )
    ),
  );

  @Effect()
  insertLeadIoSuccess$ = this.actions$.pipe(
    ofType<fromLead.InsertLeadIoSuccess>(fromLead.INSERT_LEAD_IO_SUCCESS),
    map(action => action.payload.lead),
    switchMap((lead) => this.leadService.insertLead(lead)
      .pipe(
        switchMap((lead: Lead) => {
          let actions: any[] = [
            new fromLead.UpdateLead({
              id: lead.versionId, 
              changes: {
                ...lead, state: lead.state == LeadState.new 
                  ? LeadState.master
                  : LeadState.version
              }
            })
          ];
          
          if(lead.state == LeadState.edition){
            actions.push(new fromLead.InsertLead({lead : lead}));
          }

          return actions;
        }),
        catchError(error => of(new fromLead.InsertLeadIoFail(error)))
      )
    ),
  );

  private getVersionId(leads: Lead[], leadId: string): string {
    const lead = leads.filter(i => i.leadId == leadId && i.state == LeadState.master);
    return lead.length > 0 ? lead[0].versionId : "";
  }
}
