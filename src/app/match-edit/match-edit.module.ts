import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchEditPageRoutingModule } from './match-edit-routing.module';

import { MatchEditPage } from './match-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MatchEditPage]
})
export class MatchEditPageModule {}
