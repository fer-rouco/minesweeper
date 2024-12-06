import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
    selector: 'numeric-field',
    templateUrl: './numeric-field.component.html',
    styleUrls: ['./numeric-field.component.scss'],
    imports: [FormsModule, InputFieldComponent]
})
export class NumericFieldComponent extends BaseFieldComponent {
  @Input() public type: string = 'number';

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }
}
