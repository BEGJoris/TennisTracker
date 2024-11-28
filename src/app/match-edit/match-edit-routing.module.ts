import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchEditPage } from './match-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MatchEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchEditPageRoutingModule {}
