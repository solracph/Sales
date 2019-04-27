import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LoadAllLists } from '../../actions/lists.actions';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  
  public lead$ : Observable<Lead>;
  public sources$: Observable<Source[]>;
  public reasons$: Observable<Reason[]>;
  public plans$:  Observable<Plan[]>;
  public outcomes$: Observable<Outcome[]>;

  constructor(
    private store: Store<fromLeads.State>,
  ) { 
    this.lead$ = this.store.pipe(select(fromLeadsSelectors.getSelectedLead));
    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
    this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllLists());
  }

}
