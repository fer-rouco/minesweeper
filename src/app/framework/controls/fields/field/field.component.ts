import { Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss']
})
export class FieldComponent extends BaseFieldComponent {
  @Input() public for: string = '';
}
