import { Component, Inject, OnInit } from '@angular/core';
import { Option } from 'src/app/framework/controls/fields/select-field/select-field.component';
import { ConfigService } from '../../services/config.service';
import { ConfigModel, DifficultyLevel } from '../../models/config.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/framework/generic/notification.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public difficultyLevels: Array<Option> = [
    { label: DifficultyLevel[DifficultyLevel.CUSTOM], value: DifficultyLevel.CUSTOM.toString() },
    { label: DifficultyLevel[DifficultyLevel.EASY], value: DifficultyLevel.EASY.toString() },
    { label: DifficultyLevel[DifficultyLevel.MEDIUM], value: DifficultyLevel.MEDIUM.toString() },
    { label: DifficultyLevel[DifficultyLevel.HARD], value: DifficultyLevel.HARD.toString() }
  ];

  public config: ConfigModel | undefined;
  public difficultyLevelEnabled: boolean = false;

  constructor(
    protected router: Router, 
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(NotificationService) private notificationService: NotificationService
    ) {
    this.config = undefined;
  }
  
  ngOnInit(): void {
    this.configService.restoreConfig();
    this.config = this.configService.getConfig();
    this.difficultyLevelEnabled = this.isCustomDifficultyLevel();
  }

  private validateFields(): boolean {

    const minMaxMessage: (minMax: string, object: string, moreLess: string, value: number) => string =
      (minMax: string, object: string, moreLess: string, value: number) => {
        return `${minMax} number of ${object} exceeded. Please set a number ${moreLess} than or equal to ${value}.`;
      }

    let minBombs: number = 2;
    if (this.config && this.config?.getBombs() < minBombs) {
      this.notificationService.addError(minMaxMessage("Minimum", "bombs", "greater", minBombs));
      return false;
    }
    
    if (!this.configService.validateBombsQuantity()) {
      this.notificationService.addError(minMaxMessage("Maximum", "bombs", "lower", this.configService.getMaxQuantityOfBombs()));
      return false;
    }

    let minColumns: number = 4;
    if (this.config && this.config?.getColumns() < minColumns) {
      this.notificationService.addError(minMaxMessage("Minimum", "columns", "greater", minColumns));
      return false;
    }

    let maxColumns: number = 50;
    if (this.config && this.config?.getColumns() > maxColumns) {
      this.notificationService.addError(minMaxMessage("Maximum", "columns", "lower", maxColumns));
      return false;
    }
    
    let minRows: number = 4;
    if (this.config && this.config?.getRows() < minRows) {
      this.notificationService.addError(minMaxMessage("Minimum", "rows", "greater", minRows));
      return false;
    }

    let maxRows: number = 25;
    if (this.config && this.config?.getRows() > maxRows) {
      this.notificationService.addError(minMaxMessage("Maximum", "rows", "lower", maxRows));
      return false;
    }

    return true;
  }

  public onGoToBoardClick(): void {
    if (this.validateFields()) {
        this.configService.storeConfig();
        this.navigateToBoard();
    }
  }

  public navigateToBoard(): void {
    this.router.navigateByUrl('/board');
  }

  public onDifficultyLevelChange(event?: Event): void {
    this.configService.doConfig();
    this.config = this.configService.getConfig();
    this.difficultyLevelEnabled = this.isCustomDifficultyLevel();
  }

  public isCustomDifficultyLevel(): boolean {
    return (this.config && this.config.getDifficultyLevel()) === DifficultyLevel.CUSTOM;
  }

}

