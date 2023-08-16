import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FinishedGameItemInterface, GameStatus } from '../models/finished-game-item.model';
import { StorageManagerService } from './storage/storage-manager.service';

type FinishedGameItemToPersistType = {startTime: string, endTime: string, difficulty: string, totalTimeSpent: number, status: GameStatus};
@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy {
  private resetGame$ = new Subject<null>();
  private startingNewGame$ = new Subject<null>();
  private startTimer$ = new Subject<null>();
  private gameOver$ = new Subject<boolean>();
  private updateFlagCounter$ = new Subject<number>();

  constructor(@Inject(StorageManagerService) private storageManagerService: StorageManagerService) { }

  ngOnDestroy(): void {
    let unsubscribe$: Subject<void> = new Subject<void>();
    this.resetGame$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
    this.startingNewGame$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
    this.startTimer$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
    this.gameOver$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
    this.updateFlagCounter$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
  }

  public resetGame() {
    this.resetGame$.next(null);
  }

  public getResetGameObservable(): Observable<null> {
    return this.resetGame$.asObservable();
  }

  public gameOver(gameOver: boolean) {
    this.gameOver$.next(gameOver);
  }

  public getGameOverObservable(): Observable<boolean> {
    return this.gameOver$.asObservable();
  }

  public startNewGame() {
    this.startingNewGame$.next(null);
  }

  public getStartNewGameObservable(): Observable<null> {
    return this.startingNewGame$.asObservable();
  }

  public startTimer() {
    this.startTimer$.next(null);
  }

  public getStartTimerObservable(): Observable<null> {
    return this.startTimer$.asObservable();
  }

  public updateFlagCounter(flagCounter: number) {
    this.updateFlagCounter$.next(flagCounter);
  }

  public getUpdateFlagCounterObservable(): Observable<number> {
    return this.updateFlagCounter$.asObservable();
  }

  public registerFinishedGameItem(startTimeParam: Date | null, endTime: Date | null, difficulty: string, status: GameStatus): void {
    let totalTimeSpent: string = '';
    let startTime: Date | null = (!startTimeParam) ? endTime : startTimeParam;

    if (startTime && endTime) {
      const timeSpentInSeconds: number = Math.abs(endTime.getTime() - startTime.getTime())/1000;
      const timeSpentInMinutes: number = Math.ceil(timeSpentInSeconds / 60);
      let timeSpentSufix: string = 
        (timeSpentInSeconds < 60) ? `second${(timeSpentInSeconds > 1 || timeSpentInSeconds === 0) ? 's' : ''}` : `minute${timeSpentInMinutes > 1 ? 's' : ''}`;
      totalTimeSpent = `${(timeSpentInSeconds > 60) ? timeSpentInMinutes : timeSpentInSeconds} ${timeSpentSufix}`;
    }
    let finishedGameItem: FinishedGameItemInterface = {
      startTime: startTime?.toString() || '',
      endTime: endTime?.toString() || '',
      difficulty: difficulty,
      totalTimeSpent,
      status: status
    };

    let finishedGameList: Array<FinishedGameItemInterface> = this.storageManagerService.getItem('list') as Array<FinishedGameItemInterface>;
    if (!finishedGameList) {
      finishedGameList = new Array<FinishedGameItemInterface>();
    }
    finishedGameList.push(finishedGameItem);
    this.storageManagerService.setItem('list', finishedGameList);
  }

  public getFinishedGameList(): Array<FinishedGameItemInterface> {
    return this.storageManagerService.getItem('list') as Array<FinishedGameItemInterface>;
  }
  
}
