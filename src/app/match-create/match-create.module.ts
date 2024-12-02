import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchCreatePageRoutingModule } from './match-create-routing.module';

import { MatchCreatePage } from './match-create.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatchCreatePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MatchCreatePage]
})
export class MatchCreatePageModule {}
