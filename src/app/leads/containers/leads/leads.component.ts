import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromLeadActions from '../../actions/leads.actions';
import * as fromEventActions from '../../actions/event.actions';
import * as fromListActions from '../../actions/lists.actions';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import * as fromEventSelector from '../../selectors/event.selectors';
import * as fromListSelectors from '../../selectors/list.selectors';
import { Lead, NewLead } from '../../models/lead.model';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome, Source } from '../../models';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  
  public leads$ : Observable<Lead[]>;
  public filter$ : Observable<string>;
  public outcomes$: Observable<Outcome[]>;
  public sources$: Observable<Source[]>;
  public lastEvents$: Observable<LeadEvent[]>;

  constructor(
      private store: Store<fromLeads.State>,
      private routes: Router
  ) {  }

  ngOnInit() {
    this.store.dispatch(new fromEventActions.LoadEvents());
    this.store.dispatch(new fromListActions.LoadOutcomes());
    this.store.dispatch(new fromListActions.LoadSources());
    this.store.dispatch(new fromLeadActions.LoadLeads());

    this.leads$ = this.store.pipe(select(fromLeadsSelectors.getMasterLeads));
    this.filter$ = this.store.pipe(select(fromLeadsSelectors.getFilter));
    this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
    this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
    this.lastEvents$ = this.store.pipe(select(fromEventSelector.getLastEvents));
  }

  onLeadSelection(lead: Lead){
    this.routes.navigate(['/leads/details', lead.leadId]);
  }

  applyFilter(value: string){
    this.store.dispatch(new fromLeadActions.FilterLead(value))
  }

  newLead(){
    var newLead = NewLead();
    this.store.dispatch(new fromLeadActions.InsertLead({ lead : newLead }));
    this.routes.navigate(['/leads/details', newLead.leadId]);
  }

  

}
