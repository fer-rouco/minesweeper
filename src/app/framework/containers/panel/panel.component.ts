import { Component, Input } from '@angular/core';
import { ActionComponent } from '../../generic/action/action.component';
import type { Action } from '../../generic/generic-interface';

@Component({
    selector: 'panel',
    template: `
      <div class="panel-container">
        <div>
          <div class="panel-container__title">
            <h3>{{ title }}</h3>
            <div class="actions">
              @for (action of actions; track action.id) {
                <action [object]="action"></action>
              }
            </div>
          </div>
        </div>
        <div class="panel-container__content">
          <ng-content></ng-content>
        </div>
      </div>
    `,
    styleUrls: ['./panel.component.scss'],
    imports: [ActionComponent]
})
export class PanelComponent {
  @Input() public title: string = '';
  @Input() public actions: Array<Action> = [];
}
