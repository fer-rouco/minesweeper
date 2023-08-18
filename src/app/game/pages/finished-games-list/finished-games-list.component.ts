import { Component, Inject, OnInit } from '@angular/core';
import { ColumnDefinition } from 'src/app/framework/controls/table/table.component';
import {
  FinishedGameItemInterface,
  GameStatus,
} from '../../models/finished-game-item.model';
import { BoardService } from '../../services/board.service';

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
})
export class FinishedGamesListComponent implements OnInit {
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

    const finishedGameList: Array<FinishedGameItemInterface> =
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
          return {
            startTime: formatDate(finishedGameItem.startTime),
            endTime: formatDate(finishedGameItem.endTime),
            difficulty: finishedGameItem.difficulty,
            totalTimeSpent: finishedGameItem.totalTimeSpent,
            status: GameStatus[finishedGameItem.status],
          } as FinishedGameItemForTableInterface;
        },
      );
    }
  }
}
