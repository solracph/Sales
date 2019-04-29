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
  public _subsc: Subscription = new Subscription();
  
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
    this.store.dispatch(new LoadLeadVersions({ leadId }));
    this.store.dispatch(new LoadAllLists());

    this.lead$ = this.store.pipe(select(fromLeadsSelectors.getSelectedLead));
    this.versions$ = this.store.pipe(select(fromLeadsSelectors.getAllLeadVersions, { leadId }));
    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
    this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
  }

  onLeadSelection(lead: Lead){
    this.store.dispatch(new SelectLead({ id: lead.versionId }));
  }

  ngOnDestroy(){
    this._subsc.unsubscribe();
  }
}
