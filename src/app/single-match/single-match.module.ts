import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleMatchPageRoutingModule } from './single-match-routing.module';

import { SingleMatchPage } from './single-match.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleMatchPageRoutingModule
    ],
    exports: [
        SingleMatchPage
    ],
    declarations: [SingleMatchPage]
})
export class SingleMatchPageModule {}
