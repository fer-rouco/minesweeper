import { Component, Inject, Input } from '@angular/core';
import { Tile, TileType } from '../../../models/tile.model';
import { BoardService } from 'src/app/game/services/board.service';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() public tile: Tile = {} as Tile;

  public readonly TileTypes: typeof TileType = TileType;
  public type: TileType = TileType.FILLED;
  public revealed: boolean = false;

  constructor(@Inject(BoardService) private boardService: BoardService) {}

  private updateType(contextMenuClick?: boolean): void {
    if (this.revealed) {
      return;
    }
    
    this.type = (contextMenuClick) ? this.TileTypes.FILLED : this.TileTypes.EMPTY;
    
    if (this.tile.getShow() && this.tile.isBomb() && !contextMenuClick) {
      this.type = this.TileTypes.EXPLOSION;
      this.revealed = true;
    }

    if (this.tile.isFlag()) {
      this.type = this.TileTypes.FLAG;
    }

    if (this.type === this.TileTypes.EMPTY) {
      this.revealed = true;
    }    
  }

  onClick(event: Event): void {
    this.tile.setShow(true);
    this.updateType();
    this.boardService.onTileChange(this.type);
  }

  onContextMenuClick(event: Event): void {
    event.preventDefault();
    this.tile.setFlag(!this.tile.isFlag());
    this.updateType(true);
  }
}

