import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'match-list',
        loadChildren: () => import('../match-list/match-list.module').then(m => m.MatchListPageModule)
      },
      {
        path: 'match-create',
        loadChildren: () => import('../match-create/match-create.module').then(m => m.MatchCreatePageModule)
      },
      {
        path: 'stats',
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
