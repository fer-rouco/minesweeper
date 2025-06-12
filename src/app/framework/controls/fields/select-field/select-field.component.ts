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
    template: `
      <field for="select_" label="{{label}}">
        <select
          [(ngModel)]="visualModel"
          autocomplete="off"
          class="form-control select-field"
          placeholder=""
          title="asd"
          name="select_"
          (change)="onInputChange()"
          (keyup.enter)="onInputChange()"
        >
          @for (option of options; track (option.label + '_' + option.value)) {
            <option [value]="option.value">{{option.label}}</option>
          }
        </select>
      </field>
    `,
    styles: [`
      @import '../../../../variables';

      .select-field {

        padding: var(--control-padding);
        
        border: none;
        border-radius: var(--control-border-radius);
      
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-color: #ffffff;
        background-image: url('/assets/icons/down-arrow.png');
        background-position: 100%;
        background-repeat: no-repeat;

        &:focus {
          border: var(--control-border-focus);
        }
      }
    `],
    imports: [FormsModule, FieldComponent]
})
export class SelectFieldComponent extends BaseFieldComponent {
  @Input() public options: Array<Option> = [];

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }
}
