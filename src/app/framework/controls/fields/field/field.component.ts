import { Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
    selector: 'field',
    template: `
      <div class="field-container">
        <label class="field-container__label" for="{{for}}">{{label}}</label>
        <ng-content></ng-content>
      </div>
    `,
    styles: [`
      @import '../../../../variables';

      .field-container {
        margin: var(--control-margin);
        padding: var(--control-padding);

        border: var(--control-border);
        border-radius: var(--control-border-radius);

        display: flex;
        flex-direction: column;

        &__label {
          font-size: .8rem;
          margin: .2rem;
        }
      }
    `]
})
export class FieldComponent extends BaseFieldComponent {
  @Input() public for: string = '';
}
