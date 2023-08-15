import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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

  private gameOver: boolean = false;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(BoardService) private boardService: BoardService
  ) {
    this.configService.restoreConfig();
    this.config = this.configService.getConfig();

    this.newGame();

    this.boardService.getResetGameObservable().subscribe(() => {
      this.newGame();
    });

    this.boardService.getTileChangesObservable().subscribe((tile: Tile) => {
      this.onTileChange(tile);
    });
  }

  private newGame(): void {
    this.initGrid();
    this.updateGridWithRandomBombs();
    this.updateGridWithNumbers();
    this.gameOver = false;
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

      if (!this.grid[randomRow][randomCol].isTypeBomb()) {
        this.grid[randomRow][randomCol].setType(TileType.BOMB);
        bombsPlaced++;
      }
    }
  }

  private updateGridWithNumbers(): void {
    const updateTileNumber = (rowIndex: number, columnIndex: number): void => {
      const tileRow: Array<Tile> = this.grid[rowIndex];
      
      if (tileRow) {
        const tile: Tile = tileRow[columnIndex] as Tile;
  
        if (tile && !tile.isTypeBomb()) {
          tile.setNumber(tile.getNumber() + 1);
          tile.setType(TileType.NUMBER);
        }
      }

    };

    for (let rowIndex = 0; rowIndex < this.config.getRows(); rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.config.getColumns(); columnIndex++) {
        if (!this.grid[rowIndex][columnIndex].isTypeBomb()) {
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

  updateFlagCounter() {
    const flagsQuantity = this.grid.flat().filter((tile: Tile) => tile.isFlag()).length;
    this.boardService.updateFlagCounter(flagsQuantity);
  }
  
  onTileChange(tile: Tile): void {
    const tileType: TileType = tile.getType();

    if (tileType === TileType.EXPLOSION) {
      this.boardService.gameOver();
      this.gameOver = true;
      this.grid.flat().forEach((tile: Tile) => {
        if (!tile.getShow() && tile.isTypeBomb()) {
          tile.setShow(true);
        }
      });
    }
    // else {
    //   const filledTilesQuantity = this.grid.flat().filter((tile: Tile) => tile.getShow()).length;
    //   if (filledTilesQuantity === this.config.getCells() - 1) {
    //     this.boardService.startNewGame();
    //   }
    // }

    if (!this.gameOver) {
      this.updateFlagCounter();
    } 
  }

  findRowAndColumn(tile: Tile): { row: number, column: number } | null {
    let row = -1;
    let column = -1;
  
    this.grid.findIndex((currentRow, rowIndex) => {
      const columnIndex = currentRow.findIndex(object => object === tile);
      if (columnIndex !== -1) {
        row = rowIndex;
        column = columnIndex;
        return true;
      }
      return false;
    });
  
    if (row !== -1 && column !== -1) {
      return { row, column };
    }

    return null;
  }
}
