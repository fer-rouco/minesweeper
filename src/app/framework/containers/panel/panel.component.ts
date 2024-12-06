import { Component, Input } from '@angular/core';
import { ActionComponent } from '../../generic/action/action.component';
import type { Action } from '../../generic/generic-interface';

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    imports: [ActionComponent]
})
export class PanelComponent {
  @Input() public title: string = '';
  @Input() public actions: Array<Action> = [];
}
