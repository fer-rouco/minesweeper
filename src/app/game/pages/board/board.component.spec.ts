import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Tile } from '../../models/tile.model';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { BoardHeaderComponent } from './header/board-header.component';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { TileComponent } from './tile/tile.component';
import { ConfigModel, DifficultyLevel } from '../../models/config.model';
import { DebugElement, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { By } from '@angular/platform-browser';
import { BoardService } from '../../services/board.service';
import { FinishedGameItemInterface, GameStatus } from '../../models/finished-game-item.model';

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

  const findTileElement = (tile: Tile): DebugElement | undefined => {
    const tileWithBombQuerySelectorId = `#tile-${tile.getId()}`;
    const tileComponentInstances = fixture.debugElement.queryAll(By.directive(TileComponent));
    return tileComponentInstances.find((tileComponentInstance) => tileComponentInstance.nativeElement.querySelector(tileWithBombQuerySelectorId));
  }; 

  const findTileComponentInstance = (tile: Tile): TileComponent | undefined => {
    const tileElement: DebugElement | undefined = findTileElement(tile);
    return tileElement?.injector.get(TileComponent);
  };

  const findTileElementContainer = (tile: Tile) => {
    const tileWithBombQuerySelectorId = `#tile-${tile.getId()}`;
    const tileElement: DebugElement | undefined = findTileElement(tile);
    return tileElement?.nativeElement.querySelector(tileWithBombQuerySelectorId);
  };

  const expectLastFinishedGameItemStatusToBe = (status: GameStatus) => {
    let finishedGameList: Array<FinishedGameItemInterface> = boardService.getFinishedGameList();
    let finishedGameLastItem: FinishedGameItemInterface= finishedGameList[finishedGameList.length - 1];
    expect(finishedGameLastItem).toBeDefined();
    expect(finishedGameLastItem.status).toBe(status);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelComponent, BoardComponent, BoardHeaderComponent, TileComponent, CustomButtonComponent ],
      providers: [{ provide: ConfigService, useClass: ConfigServiceMock }]
    })
    .compileComponents();

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
    let tilesWithNumber: Array<Tile> = component.grid.flat().filter((tile: Tile) => tile.isTypeNumber());
    let tilesWithNumberSum: number = tilesWithNumber.reduce<number>((previousTileNumber: number, currentTile: Tile) => {
      return previousTileNumber + currentTile.getNumber();
    }, 0);
    
    expect(tilesWithNumberSum).toBeGreaterThan(component.config.getBombs());
  });
    
  it('should fill the grid with the adjacent numbers', () => {
    let tilesWithNumber: Array<Tile> = component.grid.flat().filter((tile: Tile) => tile.isTypeNumber());
    let tilesWithNumberSum: number = tilesWithNumber.reduce<number>((previousTileNumber: number, currentTile: Tile) => {
      return previousTileNumber + currentTile.getNumber();
    }, 0);
    
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
    let noBombTiles: Array<Tile> = component.grid.flat().filter((tile: Tile) => !tile.isTypeBomb());

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
    let tile: Tile = component.grid.flat()[3];

    let tileElement = findTileElementContainer(tile);

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
    let tile: Tile = component.grid.flat()[3];

    findTileElementContainer(tile).click();

    expect(tile.isDiscovered()).toBeTrue();
  });

});
