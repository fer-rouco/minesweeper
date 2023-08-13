import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { BoardHeaderComponent } from './header/board-header.component';

@NgModule({
  declarations: [
    BoardComponent,
    TileComponent,
    BoardHeaderComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FrameworkModule
  ]
})
export class BoardModule { }
