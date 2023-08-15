import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private $resetGame = new Subject<null>();
  private $tileChange = new Subject<Tile>();
  private $startingNewGame = new Subject<null>();
  private $gameOver = new Subject<null>();
  private $updateFlagCounter = new Subject<number>();

  constructor() { }

  public tileChange(tile: Tile) {
    this.$tileChange.next(tile);
  }

  public getTileChangesObservable(): Observable<Tile> {
    return this.$tileChange.asObservable();
  }

  public resetGame() {
    this.$resetGame.next(null);
  }

  public getResetGameObservable(): Observable<null> {
    return this.$resetGame.asObservable();
  }

  public gameOver() {
    this.$gameOver.next(null);
  }

  public getGameOverObservable(): Observable<null> {
    return this.$gameOver.asObservable();
  }

  // public startNewGame() {
  //   this.$startingNewGame.next(null);
  // }

  // public getStartNewGameObservable(): Observable<null> {
  //   return this.$startingNewGame.asObservable();
  // }

  public updateFlagCounter(flagCounter: number) {
    this.$updateFlagCounter.next(flagCounter);
  }

  public getUpdateFlagCounterObservable(): Observable<number> {
    return this.$updateFlagCounter.asObservable();
  }
  
}
