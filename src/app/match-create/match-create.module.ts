import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchCreatePageRoutingModule } from './match-create-routing.module';

import { MatchCreatePage } from './match-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchCreatePageRoutingModule
  ],
  declarations: [MatchCreatePage]
})
export class MatchCreatePageModule {}
