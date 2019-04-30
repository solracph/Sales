import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadsComponent } from './containers/leads/leads.component';
import { LeadDetailsComponent } from './containers/lead-details/lead-details.component';
import { NewLeadComponent } from './containers/new-lead/new-lead.component';

const routes: Routes = [
  { path: '', component: LeadsComponent },
  { path: 'details/:leadId', component: LeadDetailsComponent },
  { path: 'new', component: NewLeadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
