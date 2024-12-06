import type {
  OnDestroy,
  OnInit,
  WritableSignal} from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  signal
} from '@angular/core';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { BoardService } from 'src/app/game/services/board.service';
import { ConfigService } from 'src/app/game/services/config.service';

@Component({
    selector: 'board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss'],
    imports: [FrameworkModule]
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  public timerIntervalSubscription: Subscription = Subscription.EMPTY;

  public elapsedTime: WritableSignal<number> = signal(0);
  public flagsCounter: WritableSignal<number> = signal(0);
  public gameOver: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(BoardService) private boardService: BoardService,
    @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.resetFlagCounter();

    this.boardService.getStartNewGameObservable().subscribe(() => {
      this.startGame();
    });

    this.boardService.getStartTimerObservable().subscribe(() => {
      this.startTimer();
    });

    this.boardService.getGameOverObservable().subscribe((gameOver: boolean) => {
      this.gameOver.set(gameOver);
      this.stopTimer();
    });

    this.boardService
      .getUpdateFlagCounterObservable()
      .subscribe((flagsQuantity: number) => {
        this.flagsCounter.set(this.configService.getConfig().getBombs() - flagsQuantity);
      });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.timerIntervalSubscription = interval(1000).subscribe(() => {
      this.elapsedTime.set(this.elapsedTime() + 1);
      this.cdr.detectChanges();
    });
  }

  stopTimer(): void {
    this.timerIntervalSubscription.unsubscribe();
  }

  public startGame(): void {
    this.gameOver.set(false);
    this.elapsedTime.set(0);
    this.resetFlagCounter();
  }

  public restartGame(): void {
    this.boardService.resetGame();
    this.startGame();
    this.stopTimer();
  }

  public resetFlagCounter(): void {
    this.flagsCounter.set(this.configService.getConfig().getBombs());
  }
}
