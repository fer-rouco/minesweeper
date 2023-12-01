import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Action {
  icon?: string;
  label?: string;
  to: string;
}

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() public title: string = '';
  @Input() public actions: Action[] = [];

  constructor(@Inject(Router) protected router: Router) {}

  public onActionClick(action: Action) {
    this.router.navigateByUrl(action.to);
  }
}
