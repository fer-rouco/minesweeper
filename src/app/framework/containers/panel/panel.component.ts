import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Action {
  label: string;
  to: string;
}

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() public title: string = '';
  @Input() public actions: Array<Action> = [];

  constructor(protected router: Router) {}

  public onActionClick(action: Action) {
    this.router.navigateByUrl(action.to);
  }
}
