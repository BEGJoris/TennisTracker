import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchListPageRoutingModule } from './match-list-routing.module';

import { MatchListPage } from './match-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchListPageRoutingModule
  ],
  declarations: [MatchListPage]
})
export class MatchListPageModule {}
