import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ConfigModel } from '../../models/config.model';
import { Tile, TileType } from '../../models/tile.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  public grid: Array<Array<Tile>> = [];

  public config: ConfigModel;

  constructor(@Inject(ConfigService) private configService: ConfigService, @Inject(BoardService) private boardService: BoardService, private cdr: ChangeDetectorRef) {
    this.config = this.configService.getConfig();

    this.initGrid();
    this.updateGridWithRandomBombs();
    this.updateGridWithNumbers();

    this.boardService.getTileChangesObservable().subscribe((tileType: TileType) => {
      this.onTileChange(tileType);
    });
  }

  private initGrid(): void {
    for (let rowIndex = 0; rowIndex < this.config.getRows(); rowIndex++) {
      this.grid[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < this.config.getColumns(); columnIndex++) {
        this.grid[rowIndex][columnIndex] = new Tile();
      }
    }
  }

  private updateGridWithRandomBombs(): void {
    let bombsPlaced = 0;
    while (bombsPlaced < this.config.getBombs()) {
      const randomRow = Math.floor(Math.random() * this.config.getRows());
      const randomCol = Math.floor(Math.random() * this.config.getColumns());

      if (!this.grid[randomRow][randomCol].isBomb()) {
        this.grid[randomRow][randomCol].setBomb(true);
        bombsPlaced++;
      }
    }
  }

  private updateGridWithNumbers(): void {
    const updateTileNumber = (rowIndex: number, columnIndex: number): void => {
      const tileRow: Array<Tile> = this.grid[rowIndex];
      
      if (tileRow) {
        const tile: Tile = tileRow[columnIndex] as Tile;
  
        if (tile && !tile.isBomb()) {
          tile.setNumber(tile.getNumber() + 1);
        }
      }

    };

    for (let rowIndex = 0; rowIndex < this.config.getRows(); rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.config.getColumns(); columnIndex++) {
        if (!this.grid[rowIndex][columnIndex].isBomb()) {
          continue;
        }      

        updateTileNumber(rowIndex - 1, columnIndex - 1);
        updateTileNumber(rowIndex, columnIndex - 1);
        updateTileNumber(rowIndex + 1, columnIndex - 1);

        updateTileNumber(rowIndex - 1, columnIndex);
        updateTileNumber(rowIndex + 1, columnIndex);

        updateTileNumber(rowIndex - 1, columnIndex + 1);
        updateTileNumber(rowIndex, columnIndex + 1);
        updateTileNumber(rowIndex + 1, columnIndex + 1);

      }
    }
  }

  onTileChange(tileType: TileType): void {
    if (tileType === TileType.EXPLOSION) {
      let grid = [...this.grid];
      
      grid.flat().forEach((tile: Tile) => {
        if (!tile.getShow()) {
          tile.setShow(true);
        }
      });

      // for (let rowIndex = 0; rowIndex < this.config.getRows(); rowIndex++) {
      //   for (let columnIndex = 0; columnIndex < this.config.getColumns(); columnIndex++) {
      //     if (!grid[rowIndex][columnIndex].getShow()) {
      //       grid[rowIndex][columnIndex].setShow(true);
      //     }
      //   }
      // }

      this.grid.splice(0, this.grid.length, ...grid);
      this.grid = grid;

      this.cdr.detectChanges();

    }
  }
}
