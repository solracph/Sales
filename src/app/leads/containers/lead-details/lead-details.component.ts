import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import { SelectLead, LoadLeadVersions } from '../../actions/leads.actions';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { LoadAllLists } from '../../actions/lists.actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  
  public lead$ : Observable<Lead>;
  public versions$ : Observable<Lead[]>;
  public state$ : Observable<LeadState>;
  public sources$: Observable<Source[]>;
  public reasons$: Observable<Reason[]>;
  public plans$:  Observable<Plan[]>;
  public outcomes$: Observable<Outcome[]>;
  public selectLeadSubscription: Subscription;
  public loadLeadVersionsSubscription: Subscription;
  
  constructor(
    private store: Store<fromLeads.State>,
    private route: ActivatedRoute
  ) { 
    this.selectLeadSubscription = route.params
      .pipe(map(params => new SelectLead({ id: params.id })))
      .subscribe(store);

    this.loadLeadVersionsSubscription = route.params
      .pipe(map(params => new LoadLeadVersions({ leadId: params.id })))
      .subscribe(store);
      
    this.lead$ = this.store.pipe(select(fromLeadsSelectors.getSelectedLead));
    this.versions$ = this.store.pipe(select(fromLeadsSelectors.getAllLeadVersions));
    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
    this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
    
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllLists());
  }
 
  onLeadSelection(lead: Lead){
    this.store.dispatch(new SelectLead({ id: lead.versionId }));
  }

  ngOnDestroy(){
    this.selectLeadSubscription.unsubscribe();
    this.loadLeadVersionsSubscription.unsubscribe();
  }
}
