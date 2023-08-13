import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';

export interface Option {
  label: string;
  value: string;
}

@Component({ 
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends BaseFieldComponent {
  @Input() public options: Array<Option> = [];

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }

}
