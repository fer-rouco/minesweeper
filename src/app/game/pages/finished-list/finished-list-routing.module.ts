import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishedListComponent } from './finished-list.component';

export const routes: Routes = [
  { "path": '', 'component': FinishedListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishedListRoutingModule { }
