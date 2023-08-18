import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigModel } from '../../models/config.model';
import { GameStatus } from '../../models/finished-game-item.model';
import { Tile, TileType } from '../../models/tile.model';
import { BoardService } from '../../services/board.service';
import { ConfigService } from '../../services/config.service';
import { NotificationService } from 'src/app/framework/generic/notification.service';

type RowColumn = { row: number; column: number };
type RowColumnOrNull = RowColumn | null;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public grid: Array<Array<Tile>> = [];

  public config: ConfigModel;

  public gameOver: boolean = false;

  private gameStart: Date | null = null;

  constructor(
    protected router: Router,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(BoardService) private boardService: BoardService,
    @Inject(NotificationService)
    private notificationService: NotificationService,
  ) {
    this.config = this.configService.getConfig();
  }

  ngOnInit(): void {
    this.configService.restoreConfig();
    this.config = this.configService.getConfig();

    this.newGame();

    this.boardService.getResetGameObservable().subscribe(() => {
      this.newGame();
    });
  }

  public navigateToFinishedGameList(): void {
    this.router.navigateByUrl('/finished-games-list');
  }

  public newGame(): void {
    this.initGrid();
    this.updateGridWithRandomBombs();
    this.updateGridWithNumbers();
    this.gameOver = false;
    this.gameStart = null;
    this.boardService.startNewGame();
  }

  private initGrid(): void {
    let id: number = 0;
    for (let rowIndex = 0; rowIndex < this.config.getRows(); rowIndex++) {
      this.grid[rowIndex] = [];
      for (
        let columnIndex = 0;
        columnIndex < this.config.getColumns();
        columnIndex++
      ) {
        const tile: Tile = new Tile();
        tile.setId(++id);
        this.grid[rowIndex][columnIndex] = tile;
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
      for (
        let columnIndex = 0;
        columnIndex < this.config.getColumns();
        columnIndex++
      ) {
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
    const flagsQuantity = this.grid
      .flat()
      .filter((tile: Tile) => tile.isFlag()).length;
    this.boardService.updateFlagCounter(flagsQuantity);
  }

  onTileChange(tile: Tile): void {
    const tileType: TileType = tile.getType();

    if (tileType === TileType.EXPLOSION && !this.gameOver) {
      this.boardService.registerFinishedGameItem(
        this.gameStart,
        new Date(),
        this.config.getDifficultyLevelAsString(),
        GameStatus.LOOSE,
      );
      this.boardService.gameOver(true);
      this.gameOver = true;
      this.notificationService.addError('Game Over!', {
        label: 'Try Again.',
        to: '/board',
      });
      this.grid.flat().forEach((tile: Tile) => {
        if (!tile.isDiscovered() && tile.isTypeBomb()) {
          tile.setDiscovered(true);
        }
      });
    } else if (tileType === TileType.EMPTY && !tile.isFlag()) {
      this.updateAdjacentTilesShowFlagWhenAEmptyTileWasClicked(tile);
    }

    if (!this.gameOver) {
      const filledTilesQuantity = this.grid
        .flat()
        .filter(
          (tile: Tile) => tile.isDiscovered() && !tile.isTypeBomb(),
        ).length;

      // Game starts here when you click in the first tile
      if (filledTilesQuantity > 0 && !this.gameStart) {
        this.gameStart = new Date();
        this.boardService.startTimer();
      }

      if (
        filledTilesQuantity ===
        this.config.getCells() - this.config.getBombs()
      ) {
        this.boardService.registerFinishedGameItem(
          this.gameStart,
          new Date(),
          this.config.getDifficultyLevelAsString(),
          GameStatus.WIN,
        );
        this.boardService.gameOver(false);
        this.notificationService.addSuccess('Game Won!', {
          label: 'Check your results.',
          to: '/finished-games-list',
        });
      }

      this.updateFlagCounter();
    }
  }

  findRowAndColumn(tile: Tile): RowColumn {
    let row = -1;
    let column = -1;

    this.grid.findIndex((currentRow, rowIndex) => {
      const columnIndex = currentRow.findIndex((object) => object === tile);
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

    return { row: -1, column: -1 };
  }

  updateAdjacentTilesShowFlagWhenAEmptyTileWasClicked(tile: Tile) {
    const rowAndColumn: RowColumnOrNull = this.findRowAndColumn(tile);
    const rowIndex: number = rowAndColumn?.row;
    const columnIndex: number = rowAndColumn?.column;

    const excludeList: Array<RowColumn> = [];

    const buildAdjacent: (
      rowIndex: number,
      columnIndex: number,
    ) => RowColumnOrNull = (
      rowIndex: number,
      columnIndex: number,
    ): RowColumnOrNull => {
      if (
        rowIndex > -1 &&
        columnIndex > -1 &&
        rowIndex < this.config.getRows() &&
        columnIndex < this.config.getColumns()
      ) {
        if (
          !excludeList.some(
            (excludeItem: RowColumn) =>
              excludeItem.column === columnIndex &&
              excludeItem.row === rowIndex,
          )
        ) {
          return { row: rowIndex, column: columnIndex };
        }
      }

      return null;
    };

    const buildAdjacentList: (
      rowIndex: number,
      columnIndex: number,
    ) => Array<RowColumn> = (
      rowIndex: number,
      columnIndex: number,
    ): Array<RowColumn> => {
      const adjacentListAux: Array<RowColumnOrNull> = [];

      adjacentListAux.push(buildAdjacent(rowIndex - 1, columnIndex - 1));
      adjacentListAux.push(buildAdjacent(rowIndex, columnIndex - 1));
      adjacentListAux.push(buildAdjacent(rowIndex + 1, columnIndex - 1));

      adjacentListAux.push(buildAdjacent(rowIndex - 1, columnIndex));
      adjacentListAux.push(buildAdjacent(rowIndex + 1, columnIndex));

      adjacentListAux.push(buildAdjacent(rowIndex - 1, columnIndex + 1));
      adjacentListAux.push(buildAdjacent(rowIndex, columnIndex + 1));
      adjacentListAux.push(buildAdjacent(rowIndex + 1, columnIndex + 1));

      return adjacentListAux.filter(
        (adjacent) => adjacent !== null,
      ) as Array<RowColumn>;
    };

    const findNextAdjacents: (adjacents: Array<RowColumn>) => void = (
      adjacents: Array<RowColumn>,
    ): void => {
      adjacents.forEach((adjacent: RowColumn) => {
        const rowIndex: number = adjacent.row;
        const columnIndex: number = adjacent.column;

        if (this.grid[rowIndex]) {
          const tile: Tile = this.grid[rowIndex][columnIndex];
          if (tile) {
            if (tile.isTypeEmpty() || (tile.isTypeNumber() && !tile.isFlag())) {
              tile.setDiscovered(true);
            }

            if (tile.isTypeEmpty()) {
              const adjacentList: Array<RowColumn> = buildAdjacentList(
                rowIndex,
                columnIndex,
              );
              excludeList.push(...adjacentList);
              findNextAdjacents(adjacentList);
            }
          }
        }
      });
    };

    const adjacentList: Array<RowColumn> = buildAdjacentList(
      rowIndex,
      columnIndex,
    );
    excludeList.push(...adjacentList);
    findNextAdjacents(adjacentList);
  }
}
