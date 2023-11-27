import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { BoardService } from 'src/app/game/services/board.service';
import { ConfigService } from 'src/app/game/services/config.service';

@Component({
  selector: 'board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
  standalone: true,
  imports: [CommonModule, FrameworkModule]
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  public timerIntervalRef: any | undefined = undefined; // eslint-disable-line
  public timer: number = 0;
  public flagCounter: number = 0;
  public gameOver: boolean = false;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(BoardService) private boardService: BoardService,
    private cdr: ChangeDetectorRef,
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
      this.gameOver = gameOver;
      this.stopTimer();
    });

    this.boardService
      .getUpdateFlagCounterObservable()
      .subscribe((flagsQuantity: number) => {
        this.flagCounter =
          this.configService.getConfig().getBombs() - flagsQuantity;
      });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    if (!this.timerIntervalRef) {
      this.timerIntervalRef = setInterval(() => {
        this.timer += 1;
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  stopTimer(): void {
    clearInterval(this.timerIntervalRef);
    this.timerIntervalRef = undefined;
  }

  public startGame(): void {
    this.gameOver = false;
    this.timer = 0;
    this.resetFlagCounter();
  }

  public restartGame(): void {
    this.boardService.resetGame();
    this.startGame();
    this.stopTimer();
  }

  public resetFlagCounter(): void {
    this.flagCounter = this.configService.getConfig().getBombs();
  }
}
