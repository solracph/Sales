import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromList from '../../reducers/lists.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import { LoadAllLists } from '../../actions/lists.actions';
import { LoadLeads } from '../../actions/leads.actions';
import { Observable } from 'rxjs';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  
  public leads$ : Observable<Lead[]>;
  public sources$: Observable<Source[]>;
  public reasons$: Observable<Reason[]>;
  public plans$:  Observable<Plan[]>;
  public outcomes$: Observable<Outcome[]>;


  constructor(private store: Store<fromLeads.State>) {

    this.leads$ = this.store.pipe(select(fromLeadsSelectors.getAllLeads));

    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
    this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
    
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllLists());
    this.store.dispatch(new LoadLeads());
  }

}
