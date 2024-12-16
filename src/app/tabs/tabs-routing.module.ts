import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {MatchsResolver} from "../resolvers/matchs.resolver";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'match-list',
        loadChildren: () => import('../match-list/match-list.module').then(m => m.MatchListPageModule),
        resolve:{matchs:MatchsResolver}
      },
      {
        path:'match-list/:id',
        loadChildren: () => import('../single-match/single-match.module').then(m => m.SingleMatchPageModule)
      },
      {
        path: 'match-create',
        loadChildren: () => import('../match-create/match-create.module').then(m => m.MatchCreatePageModule)
      },
      {
        path: 'match-list/edit/:id',
        loadChildren: () => import('../match-edit/match-edit.module').then( m => m.MatchEditPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path:'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/match-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/match-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
