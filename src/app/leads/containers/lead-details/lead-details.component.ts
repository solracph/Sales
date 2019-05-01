import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import { SelectLead, LoadLeadVersions, InsertLeadIo, UpdateLeadState, LoadLeads,  } from '../../actions/leads.actions';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { LoadAllLists } from '../../actions/lists.actions';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  
  public selectedLead$ : Observable<Lead>;
  public versions$ : Observable<Lead[]>;
  public state$ : Observable<LeadState>;
  public sources$: Observable<Source[]>;
  public reasons$: Observable<Reason[]>;
  public plans$:  Observable<Plan[]>;
  public outcomes$: Observable<Outcome[]>;
  public _subsc: Subscription = new Subscription();
  private masterLeads$: Observable<Lead[]>;
  
  constructor(
    private store: Store<fromLeads.State>,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this._subsc.add(
      this.route.params
      .subscribe((params) => {
        this.initialLoad(params['leadId']);
      })
    );
  }
 
  private initialLoad(leadId) {
    // debugger;
    this.store.dispatch(new LoadLeads());
    this.store.dispatch(new LoadAllLists());

    this.masterLeads$ = this.store.pipe(select(fromLeadsSelectors.getMasterLeads));
    this._loadVersionsWhenEditingMasterLead(leadId, this.masterLeads$);

    this.selectedLead$ = this.store.pipe(select(fromLeadsSelectors.getSelectedLead));
    this.versions$ = this.store.pipe(select(fromLeadsSelectors.getAllLeadVersions, { leadId }));
    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
    this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
  }

  private _loadVersionsWhenEditingMasterLead(leadId: string, masterLeads: Observable<Lead[]>) {
    this._subsc.add(
      masterLeads
        .pipe(
          first(),
          filter((leads: Lead[]) => !!leads.find(i => i.leadId == leadId))
        )
        .subscribe(leads => {
          this.store.dispatch(new LoadLeadVersions({ leadId }));
        })
    );
    
  }

  onLeadSelection(lead: Lead){
    this.store.dispatch(new SelectLead({ id: lead.versionId }));
  }

  formValueChange(lead : Lead){
    if(lead.state == LeadState.master)
    this.store.dispatch(new UpdateLeadState({ id: lead.versionId, changes: { state: LeadState.edition }}));
  }

  leadSaved(lead: Lead){
    if(lead.state == LeadState.new)
    {
        this.store.dispatch(new InsertLeadIo({insert: lead}));
    } 
    else if(lead.state == LeadState.edition) {
        let oldVersionId = lead.versionId;
        lead.versionId = uuid();
        lead.versionDate =  new Date();
        this.store.dispatch(new InsertLeadIo({ insert: lead, update: { versionId: oldVersionId, state: LeadState.version } }));
        //
    }
  }

  ngOnDestroy(){
    this._subsc.unsubscribe();
  }
}
