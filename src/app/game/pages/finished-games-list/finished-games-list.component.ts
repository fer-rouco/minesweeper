import { Component, Inject, type OnInit } from '@angular/core';
import { type ColumnDefinition } from 'src/app/framework/controls/table/table.component';
import { ActionHelper } from 'src/app/framework/helpers/action-helper';
import {
  type FinishedGameItemInterface,
  GameStatus,
} from '../../models/finished-game-item.model';
import { BoardService } from '../../services/board.service';
import { DifficultyLevel } from '../../models/config.model';
import { CommonModule } from '@angular/common';
import { FrameworkModule } from 'src/app/framework/framework.module';

export interface FinishedGameItemForTableInterface {
  startTime: string;
  endTime: string;
  difficulty: string;
  totalTimeSpent: string;
  status: string;
}
@Component({
  selector: 'app-finished-games-list',
  templateUrl: './finished-games-list.component.html',
  styleUrls: ['./finished-games-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FrameworkModule]
})
export class FinishedGamesListComponent implements OnInit {
  public readonly ActionHelper: typeof ActionHelper = ActionHelper;

  public columnDefinitions: Array<ColumnDefinition> = [];
  public rowObjects: Array<FinishedGameItemForTableInterface> = [];

  constructor(@Inject(BoardService) private boardService: BoardService) {}

  ngOnInit(): void {
    this.columnDefinitions = [
      { attr: 'startTime', label: 'Start Time' },
      { attr: 'endTime', label: 'End Time' },
      { attr: 'difficulty', label: 'Difficulty' },
      { attr: 'totalTimeSpent', label: 'Total Time Spent' },
      { attr: 'status', label: 'Status' },
    ];

    let finishedGameList: Array<FinishedGameItemInterface> =
      this.boardService.getFinishedGameList();

    if (finishedGameList) {
      const dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat(
        'en',
        {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        },
      );

      finishedGameList = finishedGameList.sort(
        (a: FinishedGameItemInterface, b: FinishedGameItemInterface) =>
          a.totalTimeSpent - b.totalTimeSpent
      );

      finishedGameList = finishedGameList.sort(
        (a: FinishedGameItemInterface, b: FinishedGameItemInterface) =>
          a.difficulty - b.difficulty
      );

      this.rowObjects = finishedGameList.map(
        (finishedGameItem: FinishedGameItemInterface) => {
          const formatDate: (date: string) => string = (date: string) => {
            if (!date || date.trim().length === 0) {
              return '';
            }
            return dateTimeFormat
              .format(new Date(date))
              .replaceAll('/', '-')
              .replace(',', '');
          };

          const formatSpentTime: (totalTimeSpent: number) => string = (
            totalTimeSpent: number
          ) => {
            const timeSpentInMinutes: number = Math.ceil(totalTimeSpent / 60);
            const timeSpentSufix: string =
              totalTimeSpent < 60
                ? `second${
                    totalTimeSpent > 1 || totalTimeSpent === 0 ? 's' : ''
                  }`
                : `minute${timeSpentInMinutes > 1 ? 's' : ''}`;
            return `${
              totalTimeSpent > 60 ? timeSpentInMinutes : totalTimeSpent
            } ${timeSpentSufix}`;
          };

          return {
            startTime: formatDate(finishedGameItem.startTime),
            endTime: formatDate(finishedGameItem.endTime),
            difficulty: DifficultyLevel[finishedGameItem.difficulty],
            totalTimeSpent: formatSpentTime(finishedGameItem.totalTimeSpent),
            status: GameStatus[finishedGameItem.status],
          } as FinishedGameItemForTableInterface;
        },
      );
    }
  }
}
