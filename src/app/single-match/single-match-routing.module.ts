import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleMatchPage } from './single-match.page';

const routes: Routes = [
  {
    path: '',
    component: SingleMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleMatchPageRoutingModule {}
