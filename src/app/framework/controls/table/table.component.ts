import { Component, Input } from '@angular/core';

export interface ColumnDefinition {
  attr: string;
  label: string;
}

@Component({
    selector: 'custom-table',
    template: `
      <table class="custom-table" [class.flex]="isEmptyRowObjects()">
        <tr>
          @for (columnDefinition of columnDefinitions; track columnDefinition.attr) {
            <th class="custom-table__header">{{columnDefinition.label}}</th>
          }
        </tr>
        @for (rowObject of rowObjects; track rowObject.id) {
          <tr>
            @for (columnDefinition of columnDefinitions; track columnDefinition.attr) {
              <td class="custom-table__cell">{{rowObject[columnDefinition.attr]}}</td>
            }
          </tr>  
        }
        <tr>
          @if (isEmptyRowObjects()) {
            <span class="custom-table__no-items-found">No items found.</span>
          }
        </tr>
      </table>
    `,
    styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public columnDefinitions: Array<ColumnDefinition> = [];
  @Input() public rowObjects: Array<any> = []; // eslint-disable-line

  protected isEmptyRowObjects(): boolean {
    return !this.rowObjects || this.rowObjects.length === 0;
  }
}
