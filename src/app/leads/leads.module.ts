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
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { LeadGridComponent } from './components/lead-grid/lead-grid.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LeadsComponent,
    LeadFormComponent,
    LeadGridComponent
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
    LeadService
  ]
})
export class LeadsModule { }
