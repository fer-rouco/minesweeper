import { Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
  selector: 'numeric-field',
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.scss'],
})
export class NumericFieldComponent extends BaseFieldComponent {
  @Input() public type: string = 'number';

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }
}
