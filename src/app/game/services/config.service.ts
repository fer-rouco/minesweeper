import { Inject, Injectable } from '@angular/core';
import { ConfigModel, DifficultyLevel } from '../models/config.model';
import { StorageManagerService } from './storage/storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: ConfigModel = new ConfigModel();
  
  constructor(@Inject(StorageManagerService) private storageManagerService: StorageManagerService) { }

  public getConfig(): ConfigModel {
    return this.config;
  }

  public setConfig(value: ConfigModel): void {
    this.config = value;
  }

  public doConfig(): void {
    let height: number = 0, width: number = 0, bombs: number = 0;

    switch (this.config.getDifficultyLevel()) {
      case DifficultyLevel.EASY:
        height = 9;
        width = 9;
        bombs = 10;
        break;

      case DifficultyLevel.MEDIUM:
        height = 16;
        width = 16;
        bombs = 40;
        break;

      case DifficultyLevel.HARD:
        height = 30;
        width = 16;
        bombs = 99;
        break;

      default:
        if (this.getConfig()) {
          height = this.getConfig().getColumns();
          width = this.getConfig().getRows();
          bombs = this.getConfig().getBombs();
        }
        else {
          height = 9;
          width = 9;
          bombs = 10;
        }
        break;
    }

    this.config = new ConfigModel(this.config.getDifficultyLevel(), height, width, bombs);
  }

  public storeConfig() {
    this.storageManagerService.setItem('config', this.config);
  }

  public restoreConfig() {
    this.setConfig(Object.assign(new ConfigModel(), this.storageManagerService.getItem('config') as ConfigModel));
  }
}
