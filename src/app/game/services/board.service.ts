import type { OnDestroy } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import type { Observable} from 'rxjs';
import { Subject, takeUntil } from 'rxjs';
import type {
  FinishedGameItemInterface,
  GameStatus,
} from '../models/finished-game-item.model';
import { StorageManagerService } from '../../framework/generic/storage-manager.service';
import type { DifficultyLevel } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService implements OnDestroy {
  private resetGame$ = new Subject<null>();
  private startingNewGame$ = new Subject<null>();
  private startTimer$ = new Subject<null>();
  private gameOver$ = new Subject<boolean>();
  private updateFlagCounter$ = new Subject<number>();

  constructor(
    @Inject(StorageManagerService)
    private storageManagerService: StorageManagerService,
  ) {}

  ngOnDestroy(): void {
    const unsubscribe$: Subject<void> = new Subject<void>();
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

  public registerFinishedGameItem(
    startTimeParam: Date | null,
    endTime: Date | null,
    difficulty: DifficultyLevel,
    status: GameStatus,
  ): void {
    const startTime: Date | null = !startTimeParam ? endTime : startTimeParam;

    let timeSpentInSeconds: number = 0;
    if (startTime && endTime) {
      timeSpentInSeconds =
        Math.abs(endTime.getTime() - startTime.getTime()) / 1000;
    }
    const finishedGameItem: FinishedGameItemInterface = {
      startTime: startTime?.toString() || '',
      endTime: endTime?.toString() || '',
      difficulty: difficulty,
      totalTimeSpent: timeSpentInSeconds,
      status: status,
    };

    let finishedGameList: FinishedGameItemInterface[] | null =
      this.storageManagerService.getItem<FinishedGameItemInterface[]>(
        'list',
      );
    if (!finishedGameList) {
      finishedGameList = new Array<FinishedGameItemInterface>();
    }
    finishedGameList.push(finishedGameItem);
    this.storageManagerService.setItem<FinishedGameItemInterface[]>(
      'list',
      finishedGameList,
    );
  }

  public getFinishedGameList(): FinishedGameItemInterface[] {
    return this.storageManagerService.getItem(
      'list',
    ) as FinishedGameItemInterface[];
  }
}
