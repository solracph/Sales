import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, mergeMap, filter, tap } from 'rxjs/operators';
import * as fromLead from '../actions/leads.actions';
import { LeadService } from '../services/lead.service';
import { Lead } from  '../models';
import * as fromLeads from '../reducers/leads.reducer';
import { Store  } from '@ngrx/store';
import { LeadState } from '../models/lead-state.enum';
import { Upsert } from '../models/upsert.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LeadEffects {
  
  constructor(
      private leadService: LeadService,
      private actions$: Actions,
      public matSnackBar: MatSnackBar
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
    map(action => action.payload),
    switchMap((upsert) => this.leadService.insertLead(upsert)
      .pipe(
        map((upsert: Upsert) => new fromLead.InsertLeadIoSuccess(upsert)),
        catchError(error => of(new fromLead.InsertLeadIoFail(error)))
      )
    ),
  );

  

  @Effect()
  insertLeadIoSuccess$ = this.actions$.pipe(
    ofType<fromLead.InsertLeadIoSuccess>(fromLead.INSERT_LEAD_IO_SUCCESS),
    map(action => action.payload),
      switchMap((upsert: Upsert) => {

        let actions: any[] = []
        if(upsert.insert.state == LeadState.new){
           //(UI only) New to Master 
          actions.push( new fromLead.UpdateLead({id: upsert.insert.versionId, changes: {...upsert.insert, state: LeadState.master }}));
          actions.push( new fromLead.SnackbarOpen({message: "Lead Added Successfully"}));
        } 
        else if(upsert.insert.state == LeadState.edition){
          actions.push( new fromLead.InsertLead({lead : upsert.insert}));
          actions.push( new fromLead.UpdateLead({id: upsert.update.versionId, changes: upsert.update}));
          //(UI only) Edition to  Master 
          actions.push( new fromLead.UpdateLead({id: upsert.insert.versionId, changes: { state : LeadState.master }}));
          actions.push( new fromLead.SnackbarOpen({message: "Lead Edited Successfully"}));
        }

       return actions;
      }),
      catchError(error => of(new fromLead.InsertLeadIoFail(error)))
  );

  @Effect({dispatch: false})
  closeSnackbar$ = this.actions$.pipe(
    ofType<fromLead.SnackbarClose>(fromLead.SNACKBAR_CLOSE),
    tap(() => this.matSnackBar.dismiss())
  );
    
  @Effect()
  showSnackbar$ = this.actions$.pipe(
    ofType<fromLead.SnackbarOpen>(fromLead.SNACKBAR_OPEN),
    map(action => action.payload),
    tap(payload => this.matSnackBar.open(payload.message, payload.action, payload.config)),
    delay(5000),
    map(() => new fromLead.SnackbarClose())
  );


  private getVersionId(leads: Lead[], leadId: string): string {
    const lead = leads.filter(i => i.leadId == leadId && i.state == LeadState.master);
    return lead.length > 0 ? lead[0].versionId : "";
  }
}
