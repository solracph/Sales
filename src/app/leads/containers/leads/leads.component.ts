import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import * as fromLeadActions from '../../actions/leads.actions';
import { Lead, NewLead } from '../../models/lead.model';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  
  public leads$ : Observable<Lead[]>;

  constructor(
      private store: Store<fromLeads.State>,
      private routes: Router
    ) {
    this.leads$ = this.store.pipe(select(fromLeadsSelectors.getMasterLeads));
  }

  onLeadSelection(lead: Lead){
    this.routes.navigate(['/leads/details', lead.leadId]);
  }

  newLead(){
    var newLead = NewLead();
    this.store.dispatch(new fromLeadActions.InsertLead({ lead : newLead }));
    this.routes.navigate(['/leads/details', newLead.leadId]);
  }

  ngOnInit() {
    this.store.dispatch(new fromLeadActions.LoadLeads());
  }

}
