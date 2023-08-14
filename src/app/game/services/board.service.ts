import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TileType } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private $resetGame = new Subject<null>();
  private $tileChange = new Subject<TileType>();
  private $startingNewGame = new Subject<null>();
  private $looseGame = new Subject<null>();
  private $updateFlagCounter = new Subject<number>();

  constructor() { }

  public tileChange(tileType: TileType) {
    this.$tileChange.next(tileType);
  }

  public getTileChangesObservable(): Observable<TileType> {
    return this.$tileChange.asObservable();
  }

  public resetGame() {
    this.$resetGame.next(null);
  }

  public getResetGameObservable(): Observable<null> {
    return this.$resetGame.asObservable();
  }

  public looseGame() {
    this.$looseGame.next(null);
  }

  public getLooseGameObservable(): Observable<null> {
    return this.$looseGame.asObservable();
  }

  public startNewGame() {
    this.$startingNewGame.next(null);
  }

  public getStartNewGameObservable(): Observable<null> {
    return this.$startingNewGame.asObservable();
  }

  public updateFlagCounter(flagCounter: number) {
    this.$updateFlagCounter.next(flagCounter);
  }

  public getUpdateFlagCounterObservable(): Observable<number> {
    return this.$updateFlagCounter.asObservable();
  }
  
}
