import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './containers/leads/leads.component';
import { StoreModule } from '@ngrx/store';
import * as fromLeads from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './effects/lists.effects';
import { LeadListsService } from './services/lead-lists.service';
import { LeadService } from './services/lead.service';
import { LeadFormComponent } from './components/lead-form/lead-form.component';

@NgModule({
  declarations: [
    LeadsComponent,
    LeadFormComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    StoreModule.forFeature('leads', fromLeads.reducers),
    EffectsModule.forFeature([ListEffects])
  ],
  providers:[
    LeadListsService,
    LeadService
  ]
})
export class LeadsModule { }
