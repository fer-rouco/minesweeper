import { Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent extends BaseFieldComponent {
  @Input() public type: string = '';
}
