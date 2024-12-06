import { Component, Input } from '@angular/core';

export interface ColumnDefinition {
  attr: string;
  label: string;
}

@Component({
    selector: 'custom-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent {
  @Input() public columnDefinitions: Array<ColumnDefinition> = [];
  @Input() public rowObjects: Array<any> = []; // eslint-disable-line

  protected isEmptyRowObjects(): boolean {
    return !this.rowObjects || this.rowObjects.length === 0;
  }
}
