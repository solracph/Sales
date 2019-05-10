import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAccount from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('account', fromAccount.reducers),
    //EffectsModule.forFeature([]),
  ]
})
export class AccountModule { }
