import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from 'src/app/framework/controls/table/table.component';
import { DifficultyLevel } from '../../models/config.model';


interface FinishedListInterface {
  startTime: string,
  endTime: string,
  difficulty: DifficultyLevel,
  totalTimeSpent: number,
  status: string
}

@Component({
  selector: 'app-finished-list',
  templateUrl: './finished-list.component.html',
  styleUrls: ['./finished-list.component.scss']
})
export class FinishedListComponent implements OnInit {
  public columnDefinitions: Array<ColumnDefinition> = [];
  public rowObjects: Array<FinishedListInterface> = [];

  ngOnInit(): void {
    this.columnDefinitions = [
      { attr: 'startTime',  label: "Start Time" },
      { attr: 'endTime',  label: "End Time" },
      { attr: 'difficultyLevel',  label: "Difficulty" },
      { attr: 'totalTimeSpent',  label: "Total Time Spent" },
      { attr: 'status',  label: "Status" }
    ];

    this.rowObjects = [
      { startTime: "10 am", endTime: "12 am", difficulty: DifficultyLevel.HARD, totalTimeSpent: 30, status: "Won"  },
      { startTime: "14 pm", endTime: "15 pm", difficulty: DifficultyLevel.MEDIUM, totalTimeSpent: 22, status: "Lost"  },
      { startTime: "5 am", endTime: "6 am", difficulty: DifficultyLevel.EASY, totalTimeSpent: 80, status: "Won"  }
    ];
  }
}
