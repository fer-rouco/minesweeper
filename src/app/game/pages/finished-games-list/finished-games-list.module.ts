import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedGamesListComponent } from './finished-games-list.component';
import { FinishedGamesListRoutingModule } from './finished-games-list-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';


@NgModule({
  declarations: [
    FinishedGamesListComponent
  ],
  imports: [
    CommonModule,
    FinishedGamesListRoutingModule,
    FrameworkModule
  ]
})
export class FinishedGamesListModule { }
