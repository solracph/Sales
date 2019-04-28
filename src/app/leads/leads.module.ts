import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './containers/leads/leads.component';
import { StoreModule } from '@ngrx/store';
import * as fromLeads from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './effects/lists.effects';
import { LeadEffects } from './effects/leads.effects';
import { LeadListsService } from './services/lead-lists.service';
import { LeadService } from './services/lead.service';
import { LeadGridService } from './services/lead-grid.service';
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { LeadGridComponent } from './components/lead-grid/lead-grid.component';
import { SharedModule } from '../shared/shared.module';
import { LeadDetailsComponent } from './containers/lead-details/lead-details.component';
import { LeadVersionsListComponent } from './components/lead-versions-list/lead-versions-list.component';

@NgModule({
  declarations: [
    LeadsComponent,
    LeadFormComponent,
    LeadGridComponent,
    LeadDetailsComponent,
    LeadVersionsListComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    StoreModule.forFeature('leads', fromLeads.reducers),
    EffectsModule.forFeature([ListEffects,LeadEffects]),
    SharedModule
  ],
  providers:[
    LeadListsService,
    LeadService,
    LeadGridService
  ]
})
export class LeadsModule { }
