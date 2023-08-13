import { Injectable } from '@angular/core';
import { ConfigModel, DificultyLevel } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: ConfigModel = new ConfigModel();
  
  constructor() { }

  public getConfig(): ConfigModel {
    return this.config;
  }

  public setConfig(value: ConfigModel): void {
    this.config = value;
  }

  public doConfig(customConfig?: ConfigModel): void {
    let height: number = 0, width: number = 0, bombs: number = 0;

    switch (this.config.getDificultyLevel()) {
      case DificultyLevel.EASY:
        height = 9;
        width = 9;
        bombs = 10;
        break;

      case DificultyLevel.MEDIUM:
        height = 16;
        width = 16;
        bombs = 40;
        break;

      case DificultyLevel.HARD:
        height = 30;
        width = 16;
        bombs = 99;
        break;

      default:
        if (customConfig) {
          height = customConfig.getColumns();
          width = customConfig.getRows();
          bombs = customConfig.getBombs();
        }
        else {
          height = 9;
          width = 9;
          bombs = 10;
        }
        break;
    }

    this.config = new ConfigModel(this.config.getDificultyLevel(), height, width, bombs);
  }

}
