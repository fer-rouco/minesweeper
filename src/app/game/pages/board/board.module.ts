import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { BoardHeaderComponent } from './header/board-header.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    TileComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FrameworkModule
  ]
})
export class BoardModule { }
