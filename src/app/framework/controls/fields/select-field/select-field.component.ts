import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { FieldComponent } from '../field/field.component';

export interface Option {
  label: string;
  value: string;
}

@Component({
    selector: 'select-field',
    templateUrl: './select-field.component.html',
    styleUrls: ['./select-field.component.scss'],
    imports: [FormsModule, FieldComponent]
})
export class SelectFieldComponent extends BaseFieldComponent {
  @Input() public options: Array<Option> = [];

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }
}
