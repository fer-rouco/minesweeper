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

  private gameOver: boolean = false;

  constructor(@Inject(BoardService) private boardService: BoardService) {}
  
  public ngOnInit(): void {
    this.boardService.getGameOverObservable().subscribe(() => {
      this.gameOver = true;
    });
  }

  private updateType(): void {
    if (this.gameOver) {
      return;
    }
    
    if (!this.tile) {
      return;
    }

    if (this.tile.isDiscovered()) {
      return;
    }

    if (this.tile.isFlag()) {
      return;
    }
    
    if (this.tile.isTypeBomb()) {
      this.tile.setType(this.TileTypes.EXPLOSION);
      this.tile.setDiscovered(true);
    }

    if (this.tile.isTypeBomb() || this.tile.isTypeEmpty() || this.tile.isTypeNumber()) {
      this.tile.setDiscovered(true);
    }
  }

  public onClick(event: Event): void {
    if (!this.tile) {
      return;
    }

    this.updateType();
    this.boardService.tileChange(this.tile);
  }

  public onContextMenuClick(event: Event): void {
    event.preventDefault();
    
    if (this.gameOver) {
      return;
    }
    
    if (!this.tile) {
      return;
    }

    if (this.tile.isDiscovered()) {
      return;
    }

    this.tile.setFlag(!this.tile.isFlag());
    this.boardService.tileChange(this.tile);
  }


}

