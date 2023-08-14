export enum DificultyLevel {
  CUSTOM = 0,
  EASY = 1,
  MEDIUM = 2,
  HARD = 3
}


export class ConfigModel {
  constructor (
    private dificultyLevel: DificultyLevel = DificultyLevel.CUSTOM,
    private columns: number = 9,
    private rows: number = 9,
    private bombs: number = 10
  ) {}

  public getDificultyLevel(): DificultyLevel {
    return this.dificultyLevel;
  }

  public setDificultylevel(value: DificultyLevel): void {
    this.dificultyLevel = value;
  }

  public getColumns(): number {
    return this.columns;
  }

  public setColumns(value: number): void {
    this.columns = value;
  }

  public getRows(): number {
    return this.rows;
  }

  public setRows(value: number): void {
    this.rows = value;
  }
  
  public getCells(): number {
    return this.rows * this.columns;
  }

  public getBombs(): number {
    return this.bombs;
  }
  
  public setBombs(value: number): void {
    this.bombs = value;
  }
}