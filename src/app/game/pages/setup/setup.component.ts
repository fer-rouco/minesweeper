import { Component, Inject, OnInit } from '@angular/core';
import { Option } from 'src/app/framework/controls/fields/select-field/select-field.component';
import { ConfigService } from '../../services/config.service';
import { ConfigModel, DificultyLevel } from '../../models/config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public dificultyLevels: Array<Option> = [
    { label: DificultyLevel[DificultyLevel.CUSTOM], value: DificultyLevel.CUSTOM.toString() },
    { label: DificultyLevel[DificultyLevel.EASY], value: DificultyLevel.EASY.toString() },
    { label: DificultyLevel[DificultyLevel.MEDIUM], value: DificultyLevel.MEDIUM.toString() },
    { label: DificultyLevel[DificultyLevel.HARD], value: DificultyLevel.HARD.toString() }
  ];

  public config: ConfigModel | undefined;

  constructor(protected router: Router, @Inject(ConfigService) private configService: ConfigService) {
    this.config = undefined;
  }
  
  ngOnInit(): void {
    this.configService.restoreConfig();
    this.config = this.configService.getConfig();
  }

  public onGoToBoardClick(): void {
    this.configService.storeConfig();
    this.navigateToBoard();
  }

  public navigateToBoard(): void {
    this.router.navigateByUrl('/board');
  }

  public onDificultyLevelChange(event?: Event): void {
    this.configService.doConfig();
    this.config = this.configService.getConfig();
  }

  public isCustomDificultyLevel(): boolean {
    return (this.config && this.config.getDificultyLevel()) === DificultyLevel.CUSTOM;
  }

}

