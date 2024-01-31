import { Component, Input } from '@angular/core';
import { Action } from '../../generic/generic-interface';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() public title: string = '';
  @Input() public actions: Action[] = [];
}
