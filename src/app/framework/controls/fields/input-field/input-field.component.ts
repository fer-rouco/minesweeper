import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { FieldComponent } from '../field/field.component';

@Component({
    selector: 'input-field',
    template: `
      <field for="input_{{type}}_{{attr}}" label="{{label}}">
        <input
          id="input-{{attr}}"
          type="{{type}}"
          [(ngModel)]="visualModel"
          autocomplete="off"
          class="form-control input-field"
          placeholder=""
          [title]="label"
          name="input_{{type}}_{{attr}}"
          (change)="onInputChange()"
          (keyup.enter)="onInputChange()"
          [disabled]="!enabled"
          title="{{attr}}"
        />
      </field>
    `,
    styles: [`
      @import '../../../../variables';

      .input-field {
        
        padding: var(--control-padding);

        border: none;
        border-radius: var(--control-border-radius);

        &:focus {
          border: var(--control-border-focus);
        }

      }
    `],
    imports: [FormsModule, FieldComponent]
})
export class InputFieldComponent extends BaseFieldComponent {
  @Input() public type: string = '';
}
