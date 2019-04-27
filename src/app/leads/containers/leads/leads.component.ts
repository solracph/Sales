import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLeads from "../../reducers/leads.reducer";
import * as fromList from '../../selectors/list.selectors';
import { LoadAllLists } from '../../actions/lists.actions';
import { Observable } from 'rxjs';
import { Source, Reason, Plan, Outcome } from '../../models';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  
  public sources$: Observable<Source[]>;
  public reasons$: Observable<Reason[]>;
  public plans$:  Observable<Plan[]>;
  public outcomes$: Observable<Outcome[]>;

  constructor(private store: Store<fromLeads.State>) {
    this.sources$ = this.store.pipe(select(fromList.getSources));
    this.reasons$ = this.store.pipe(select(fromList.getReasons));
    this.plans$ = this.store.pipe(select(fromList.getPlans));
    this.outcomes$ = this.store.pipe(select(fromList.getOutcomes));
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllLists());
  }

}
