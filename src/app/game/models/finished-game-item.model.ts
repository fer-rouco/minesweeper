import { DifficultyLevel } from "./config.model";

export enum GameStatus {
  WIN = 0,
  LOOSE = 1,
}

export interface FinishedGameItemInterface {
  startTime: string;
  endTime: string;
  difficulty: DifficultyLevel;
  totalTimeSpent: number;
  status: GameStatus;
}
