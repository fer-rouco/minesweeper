import { Component, Inject, type OnInit } from '@angular/core';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { type ColumnDefinition, TableComponent } from 'src/app/framework/controls/table/table.component';
import { ActionHelper } from 'src/app/framework/helpers/action-helper';
import { DifficultyLevel } from '../../models/config.model';
import {
  type FinishedGameItemInterface,
  GameStatus,
} from '../../models/finished-game-item.model';
import { BoardService } from '../../services/board.service';

export interface FinishedGameItemForTableInterface {
  id: string,
  startTime: string;
  endTime: string;
  difficulty: string;
  totalTimeSpent: string;
  status: string;
}
@Component({
    selector: 'app-finished-games-list',
    template: `
      <panel class="finished-game-list" title="Finished Games List" [actions]="ActionHelper.buildFinishedGameListActions()">
        <custom-table  [rowObjects]="rowObjects"  [columnDefinitions]="columnDefinitions"></custom-table>
      </panel>
    `,
    styles: [`
      .finished-game-list {
        view-transition-name: scale3d;
      }
    `],
    imports: [PanelComponent, TableComponent]
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

          const randomInteger: number = Math.floor(Math.random() * 999 + 100);
          const finishedGameItemForTable: FinishedGameItemForTableInterface = {
            startTime: formatDate(finishedGameItem.startTime),
            endTime: formatDate(finishedGameItem.endTime),
            difficulty: DifficultyLevel[finishedGameItem.difficulty],
            totalTimeSpent: formatSpentTime(finishedGameItem.totalTimeSpent),
            status: GameStatus[finishedGameItem.status],
          } as FinishedGameItemForTableInterface;
          finishedGameItemForTable.id = `${finishedGameItemForTable.status}_${finishedGameItemForTable.difficulty}_${finishedGameItemForTable.startTime.replace(' ', '_')}_${randomInteger}`;

          return finishedGameItemForTable;
        },
      );
    }
  }
}
