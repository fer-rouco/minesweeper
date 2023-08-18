import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { ConfigModel, DifficultyLevel } from '../../models/config.model';
import {
  FinishedGameItemInterface,
  GameStatus,
} from '../../models/finished-game-item.model';
import { Tile } from '../../models/tile.model';
import { BoardService } from '../../services/board.service';
import { ConfigService } from '../../services/config.service';
import { BoardComponent } from './board.component';
import { BoardHeaderComponent } from './header/board-header.component';
import { TileComponent } from './tile/tile.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SetupModule } from '../setup/setup.module';
import { FinishedGamesListModule } from '../finished-games-list/finished-games-list.module';

class ConfigServiceMock extends ConfigService {
  public override getConfig(): ConfigModel {
    return new ConfigModel(DifficultyLevel.CUSTOM, 4, 4, 3);
  }
}

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let boardService: BoardService;

  const getTilesWithBomb = () => {
    return component.grid.flat().filter((tile: Tile) => tile.isTypeBomb());
  };

  const findPanelElement = (): Element | null => {
    const querySelectorId = `.panel-container`;
    const componentInstance = fixture.debugElement.query(
      By.directive(PanelComponent),
    );
    return componentInstance.nativeElement.querySelector(querySelectorId);
  };

  const findBoardHeaderElement = (): Element | null => {
    const boardHeaderQuerySelectorId = `.board-header`;
    const boardHeaderComponentInstance = fixture.debugElement.query(
      By.directive(BoardHeaderComponent),
    );
    return boardHeaderComponentInstance.nativeElement.querySelector(
      boardHeaderQuerySelectorId,
    );
  };

  // const findBoardHeaderComponentInstance = (): BoardHeaderComponent | null => {
  //   const boardHeaderComponentInstance = fixture.debugElement.query(
  //     By.directive(BoardHeaderComponent),
  //   );
  //   return boardHeaderComponentInstance.injector.get(
  //     boardHeaderComponentInstance,
  //   );
  // };

  const findTileElement = (tile: Tile): DebugElement | undefined => {
    const tileWithBombQuerySelectorId = `#tile-${tile.getId()}`;
    const tileComponentInstances = fixture.debugElement.queryAll(
      By.directive(TileComponent),
    );
    return tileComponentInstances.find((tileComponentInstance) =>
      tileComponentInstance.nativeElement.querySelector(
        tileWithBombQuerySelectorId,
      ),
    );
  };

  // const findTileComponentInstance = (tile: Tile): TileComponent | undefined => {
  //   const tileElement: DebugElement | undefined = findTileElement(tile);
  //   return tileElement?.injector.get(TileComponent);
  // };

  const findTileElementContainer = (tile: Tile) => {
    const tileWithBombQuerySelectorId = `#tile-${tile.getId()}`;
    const tileElement: DebugElement | undefined = findTileElement(tile);
    return tileElement?.nativeElement.querySelector(
      tileWithBombQuerySelectorId,
    );
  };

  const expectLastFinishedGameItemStatusToBe = (status: GameStatus) => {
    const finishedGameList: Array<FinishedGameItemInterface> =
      boardService.getFinishedGameList();
    const finishedGameLastItem: FinishedGameItemInterface =
      finishedGameList[finishedGameList.length - 1];
    expect(finishedGameLastItem).toBeDefined();
    expect(finishedGameLastItem.status).toBe(status);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupModule, FinishedGamesListModule, AppRoutingModule],
      declarations: [
        PanelComponent,
        BoardComponent,
        BoardHeaderComponent,
        TileComponent,
        CustomButtonComponent,
      ],
      providers: [{ provide: ConfigService, useClass: ConfigServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    boardService = fixture.debugElement.injector.get(BoardService);
  });

  beforeEach(async () => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the grid with random bombs', () => {
    expect(getTilesWithBomb().length).toBe(component.config.getBombs());
  });

  it('should fill the grid with the adjacent numbers', () => {
    const tilesWithNumber: Array<Tile> = component.grid
      .flat()
      .filter((tile: Tile) => tile.isTypeNumber());
    const tilesWithNumberSum: number = tilesWithNumber.reduce<number>(
      (previousTileNumber: number, currentTile: Tile) => {
        return previousTileNumber + currentTile.getNumber();
      },
      0,
    );

    expect(tilesWithNumberSum).toBeGreaterThan(component.config.getBombs());
  });

  it('should the game over with loose status when you click in a bomb', () => {
    const tileWithBomb: Tile = getTilesWithBomb()[1];
    findTileElementContainer(tileWithBomb).click();

    expect(component.gameOver).toBeTrue();
    getTilesWithBomb().forEach((tile: Tile) => {
      expect(tile.isDiscovered()).toBeTrue();
    });

    expectLastFinishedGameItemStatusToBe(GameStatus.LOOSE);
  });

  it('should the game end with win status when you click in all the tiles which are no bombs', () => {
    const noBombTiles: Array<Tile> = component.grid
      .flat()
      .filter((tile: Tile) => !tile.isTypeBomb());

    noBombTiles.forEach((noBombTile: Tile) => {
      findTileElementContainer(noBombTile).click();
    });

    expect(component.gameOver).toBeFalse();
    getTilesWithBomb().forEach((tile: Tile) => {
      expect(tile.isDiscovered()).toBeFalse();
    });

    expectLastFinishedGameItemStatusToBe(GameStatus.WIN);
  });

  it('should a flag appear when you do a right click in a tile', fakeAsync(() => {
    const tile: Tile = component.grid.flat()[3];

    const tileElement = findTileElementContainer(tile);

    const contextMenuEvent: MouseEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    tileElement.dispatchEvent(contextMenuEvent);

    tick();

    expect(tile.isFlag()).toBeTrue();
    expect(tile.isDiscovered()).toBeFalse();

    flush();
  }));

  it('should a tile be discovered when you click on it', () => {
    const tile: Tile = component.grid.flat()[3];

    findTileElementContainer(tile).click();

    expect(tile.isDiscovered()).toBeTrue();
  });

  // it('should the timer start when all the tiles are covered and you click on one of them', fakeAsync(() => {
  //   let tile: Tile = component.grid.flat()[3];

  //   findTileElementContainer(tile).click();

  //   tick(1001);
  //   fixture.detectChanges();

  //   // expect(findBoardHeaderComponentInstance()?.timer).toBeGreaterThan(0);
  //   let clockSpan: HTMLSpanElement = findBoardHeaderElement()?.querySelector("#timer") as HTMLSpanElement;
  //   expect(Number.parseInt(clockSpan?.innerText)).toBeGreaterThan(0);

  //   flush();
  // }));

  it('should the bomb counter decrease when do a right click in a tile', fakeAsync(() => {
    const bombSpan: HTMLSpanElement = findBoardHeaderElement()?.querySelector(
      '#flag-counter',
    ) as HTMLSpanElement;
    expect(Number.parseInt(bombSpan?.innerText)).toBe(
      component.config.getBombs(),
    );

    const tile: Tile = component.grid.flat()[3];

    const tileElement = findTileElementContainer(tile);

    const contextMenuEvent: MouseEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    tileElement.dispatchEvent(contextMenuEvent);

    tick();
    fixture.detectChanges();

    expect(Number.parseInt(bombSpan?.innerText)).toBe(
      component.config.getBombs() - 1,
    );

    flush();
  }));

  it('should navigate to the setup page when the setup button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLImageElement = findPanelElement()?.querySelector(
      '#setup',
    ) as HTMLImageElement;
    linkElement.click();

    tick();

    expect(location.pathname).toBe('/setup');

    flush();
  }));

  it('should navigate to the finished games list page when the finished games list button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLImageElement = findPanelElement()?.querySelector(
      '#finished-games-list',
    ) as HTMLImageElement;
    linkElement.click();

    tick();

    expect(location.pathname).toBe('/finished-games-list');

    flush();
  }));
});
