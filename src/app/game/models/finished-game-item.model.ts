export enum GameStatus {
  WIN = 0,
  LOOSE = 1
}

export interface FinishedGameItemInterface {
  startTime: string,
  endTime: string,
  difficulty: string,
  totalTimeSpent: string,
  status: GameStatus
}