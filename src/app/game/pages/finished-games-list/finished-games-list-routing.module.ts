import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishedGamesListComponent } from './finished-games-list.component';

export const routes: Routes = [
  { path: '', component: FinishedGamesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishedGamesListRoutingModule {}
