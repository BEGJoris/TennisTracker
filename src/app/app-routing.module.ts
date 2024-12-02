import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'match-list',
    loadChildren: () => import('./match-list/match-list.module').then( m => m.MatchListPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./match-edit/match-edit.module').then( m => m.MatchEditPageModule)
  },
  {
    path: 'match-create',
    loadChildren: () => import('./match-create/match-create.module').then( m => m.MatchCreatePageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
