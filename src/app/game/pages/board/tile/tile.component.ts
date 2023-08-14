import { Component, Inject, Input, OnInit } from '@angular/core';
import { Tile, TileType } from '../../../models/tile.model';
import { BoardService } from 'src/app/game/services/board.service';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  public readonly TileTypes: typeof TileType = TileType;
  
  @Input() public tile: Tile | undefined = undefined;

  private loose: boolean = false;

  constructor(@Inject(BoardService) private boardService: BoardService) {}
  
  ngOnInit(): void {
    this.boardService.getLooseGameObservable().subscribe(() => {
      this.loose = true;
    });
  }

  private updateType(contextMenuClick?: boolean): void {
    if (this.loose) {
      return;
    }
    
    if (!this.tile) {
      return;
    }

    if (this.tile.getShow()) {
      return;
    }
    
    this.tile.setType((contextMenuClick) ? this.TileTypes.FILLED : this.TileTypes.EMPTY);
    
    if (this.tile.isBomb() && !contextMenuClick) {
      this.tile.setType(this.TileTypes.EXPLOSION);
      this.tile.setShow(true);
    }

    if (this.tile.isFlag()) {
      this.tile.setType(this.TileTypes.FLAG);
    }

    if (this.tile.getType() === this.TileTypes.EMPTY) {
      this.tile.setShow(true);
    }    
  }

  onClick(event: Event): void {
    if (!this.tile) {
      return;
    }

    this.updateType();
    this.boardService.tileChange(this.tile.getType());
  }

  onContextMenuClick(event: Event): void {
    if (!this.tile) {
      return;
    }

    event.preventDefault();
    this.tile.setFlag(!this.tile.isFlag());
    this.updateType(true);
    this.boardService.tileChange(this.tile.getType());
  }

  isTileType(tileType: TileType): boolean {
    return (!!this.tile && this.tile.getType() === tileType);
  }

  isTileNumber(tileNumber: number): boolean {
    return (!!this.tile && this.tile.getNumber() === tileNumber);
  }
}

