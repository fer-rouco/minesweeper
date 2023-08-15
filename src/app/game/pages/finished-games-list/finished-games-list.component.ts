import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from 'src/app/framework/controls/table/table.component';
import { DifficultyLevel } from '../../models/config.model';


interface FinishedGamesListInterface {
  startTime: string,
  endTime: string,
  difficulty: string,
  totalTimeSpent: number,
  status: string
}

@Component({
  selector: 'app-finished-games-list',
  templateUrl: './finished-games-list.component.html',
  styleUrls: ['./finished-games-list.component.scss']
})
export class FinishedGamesListComponent implements OnInit {
  public columnDefinitions: Array<ColumnDefinition> = [];
  public rowObjects: Array<FinishedGamesListInterface> = [];

  ngOnInit(): void {
    this.columnDefinitions = [
      { attr: 'startTime',  label: "Start Time" },
      { attr: 'endTime',  label: "End Time" },
      { attr: 'difficulty',  label: "Difficulty" },
      { attr: 'totalTimeSpent',  label: "Total Time Spent" },
      { attr: 'status',  label: "Status" }
    ];

    this.rowObjects = [
      { startTime: "10 am", endTime: "12 am", difficulty: DifficultyLevel[DifficultyLevel.HARD], totalTimeSpent: 30, status: "Won"  },
      { startTime: "14 pm", endTime: "15 pm", difficulty: DifficultyLevel[DifficultyLevel.MEDIUM], totalTimeSpent: 22, status: "Lost"  },
      { startTime: "5 am", endTime: "6 am", difficulty: DifficultyLevel[DifficultyLevel.EASY], totalTimeSpent: 80, status: "Won"  }
    ];
  }
}
