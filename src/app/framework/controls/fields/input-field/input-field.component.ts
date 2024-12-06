import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { FieldComponent } from '../field/field.component';

@Component({
    selector: 'input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    imports: [FormsModule, FieldComponent]
})
export class InputFieldComponent extends BaseFieldComponent {
  @Input() public type: string = '';
}
