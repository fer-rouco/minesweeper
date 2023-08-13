import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './game/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { "path": '', "redirectTo": '/setup', "pathMatch": 'full' },
  {
     "path": "setup",
     "loadChildren": () => import('./game/pages/setup/setup.module').then(m => m.SetupModule)
  },
  {
     "path": "board",
     "loadChildren": () => import('./game/pages/board/board.module').then(m => m.BoardModule)
  },
  {
     "path": "finished-list",
     "loadChildren": () => import('./game/pages/finished-list/finished-list.module').then(m => m.FinishedListModule)
  },
  { "path": '**', "component": PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
