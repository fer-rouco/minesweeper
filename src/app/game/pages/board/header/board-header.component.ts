import type {
  OnDestroy,
  OnInit,
  WritableSignal
} from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  signal
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { BoardService } from 'src/app/game/services/board.service';
import { ConfigService } from 'src/app/game/services/config.service';

@Component({
    selector: 'board-header',
    template: `
      <div class="board-header">
        <div class="board-header-display-container">
          <i class="board-header-display-container__icon icon-bomb" ></i>
          <span id="flag-counter" class="board-header-display-container__label"> {{ flagsCounter() }}</span>
        </div>
        <custom-button (click)='restartGame()' class="board-header__button">
          @if (!gameOver()) {
            <img class="board-header__face" src="assets/icons/face_unpressed.svg" title="Restart Game"/>
          }
          @else {
            <img class="board-header__face" src="assets/icons/face_loose.svg" title="Restart Game"/>
          }
        </custom-button>
        <div class="board-header-display-container">
          <i class="board-header-display-container__icon icon-clock" ></i>
          <span id="timer" class="board-header-display-container__label"> {{ elapsedTime() }}</span>
        </div>
      </div>
    `,
    styleUrls: ['./board-header.component.scss'],
    imports: [CustomButtonComponent]
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
