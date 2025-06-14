import type {
  OnInit,
  WritableSignal
} from '@angular/core';
import {
  Component,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { NumericFieldComponent } from 'src/app/framework/controls/fields/numeric-field/numeric-field.component';
import type { Option } from 'src/app/framework/controls/fields/select-field/select-field.component';
import { SelectFieldComponent } from 'src/app/framework/controls/fields/select-field/select-field.component';
import { NotificationService } from 'src/app/framework/generic/notification.service';
import type { ConfigModel } from '../../models/config.model';
import { DifficultyLevel } from '../../models/config.model';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-setup',
    styles: [`
      .panel {
        view-transition-name: scale3d;
        max-width: 20rem;

        &__to-board-button {
          display: flex;
          justify-content: center;
        }
      }
    `],
    template: `
      <div class="panel">
        <panel title='Setup' >
          <select-field [model]="config()" attr="difficultyLevel" label='Difficulty Level' [options]='difficultyLevels' (change)="onDifficultyLevelChange()" ></select-field>
          <numeric-field [model]="config()" attr="columns" label='Columns' [enabled]="customDifficultyEnabled()" ></numeric-field>
          <numeric-field [model]="config()" attr="rows" label='Rows' [enabled]="customDifficultyEnabled()" ></numeric-field>
          <numeric-field [model]="config()" attr="bombs" label='Bombs' [enabled]="customDifficultyEnabled()" ></numeric-field>
          <custom-button (click)='onGoToBoardClick()' class='panel__to-board-button' >
            Go to Board
          </custom-button>
        </panel>
      </div>
    `,
    imports: [PanelComponent, SelectFieldComponent, NumericFieldComponent, CustomButtonComponent]
})
export class SetupComponent implements OnInit {
  private readonly configService = inject(ConfigService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  public readonly difficultyLevels: Array<Option> = [
    { label: DifficultyLevel[DifficultyLevel.CUSTOM], value: DifficultyLevel.CUSTOM.toString() },
    { label: DifficultyLevel[DifficultyLevel.EASY], value: DifficultyLevel.EASY.toString() },
    { label: DifficultyLevel[DifficultyLevel.MEDIUM], value: DifficultyLevel.MEDIUM.toString() },
    { label: DifficultyLevel[DifficultyLevel.HARD], value: DifficultyLevel.HARD.toString() }
  ];

  public config: WritableSignal<ConfigModel | undefined> = signal(undefined);
  public customDifficultyEnabled: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.configService.restoreConfig();
    this.config.set(this.configService.getConfig());
    this.customDifficultyEnabled.set(this.isCustomDifficultyLevel());
  }

  private validateFields(): boolean {
    const minMaxMessage: (
      minMax: string,
      object: string,
      moreLess: string,
      value: number,
    ) => string = (
      minMax: string,
      object: string,
      moreLess: string,
      value: number,
    ) => {
      return `${minMax} number of ${object} exceeded. Please set a number ${moreLess} than or equal to ${value}.`;
    };

    if (!this.config()) {
      return false;
    }

    const config: ConfigModel = this.config() as ConfigModel;
    const minBombs: number = 2;
    if (config.getBombs() < minBombs) {
      this.notificationService.addError(
        minMaxMessage('Minimum', 'bombs', 'greater', minBombs),
      );
      return false;
    }

    if (!this.configService.validateBombsQuantity()) {
      this.notificationService.addError(
        minMaxMessage(
          'Maximum',
          'bombs',
          'lower',
          this.configService.getMaxQuantityOfBombs(),
        ),
      );
      return false;
    }

    const minColumns: number = 4;
    if (config.getColumns() < minColumns) {
      this.notificationService.addError(
        minMaxMessage('Minimum', 'columns', 'greater', minColumns),
      );
      return false;
    }

    const maxColumns: number = 50;
    if (config.getColumns() > maxColumns) {
      this.notificationService.addError(
        minMaxMessage('Maximum', 'columns', 'lower', maxColumns),
      );
      return false;
    }

    const minRows: number = 4;
    if (config.getRows() < minRows) {
      this.notificationService.addError(
        minMaxMessage('Minimum', 'rows', 'greater', minRows),
      );
      return false;
    }

    const maxRows: number = 25;
    if (config.getRows() > maxRows) {
      this.notificationService.addError(
        minMaxMessage('Maximum', 'rows', 'lower', maxRows),
      );
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

  public onDifficultyLevelChange(): void {
    this.configService.doConfig();
    this.config.set(this.configService.getConfig());
    this.customDifficultyEnabled.set(this.isCustomDifficultyLevel());
  }

  public isCustomDifficultyLevel(): boolean {
    return (
      (this.config() && (this.config() as ConfigModel).getDifficultyLevel()) === DifficultyLevel.CUSTOM
    );
  }
}
