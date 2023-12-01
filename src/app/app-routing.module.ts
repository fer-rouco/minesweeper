import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './game/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  {
    path: 'setup',
    loadComponent: () => import('./game/pages/setup/setup.component').then((m) => m.SetupComponent)
  },
  {
    path: 'board',
    loadComponent: () => import('./game/pages/board/board.component').then((m) => m.BoardComponent)
  },
  {
    path: 'finished-games-list',
    loadComponent: () => import('./game/pages/finished-games-list/finished-games-list.component').then((m) => m.FinishedGamesListComponent)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
