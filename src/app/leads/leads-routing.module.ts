import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadsComponent } from './containers/leads/leads.component';
import { LeadDetailsComponent } from './containers/lead-details/lead-details.component';

const routes: Routes = [
  { path: '', component: LeadsComponent },
  { path: 'details', component: LeadDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
