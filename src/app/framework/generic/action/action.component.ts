import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../controls/button/button.component';
import type { Action, FunctionAction, Icon, Label, LinkAction } from '../../generic/generic-interface';
import { ActionType } from '../../generic/generic-interface';


@Component({
    selector: 'action',
    templateUrl: './action.component.html',
    styleUrl: './action.component.scss',
    imports: [CommonModule, CustomButtonComponent]
})
export class ActionComponent {
  @Input() public object: Action | undefined = {} as Action;

  constructor(@Inject(Router) protected router: Router) {}

  public isTypeButton(action: Action): boolean {
    return action.type === ActionType.BUTTON;
  }
  
  public isTypeLink(action: Action): boolean {
    return action.type === ActionType.LINK;
  }
  
  public isFunction(action: Action): action is FunctionAction {
    return ('function' in action);
  }

  public isLink(action: Action): action is LinkAction {
    return ('to' in action);
  }
  
  public isIcon(action: object): action is Icon {
    return (action as Icon).icon !== undefined;
  }

  public isLabel(action: object): action is Label {
    return (action as Label).label !== undefined;
  }

  public onActionClick(action: Action) {
    if (!action) {
      return;
    }
    
    if (this.isLink(action)) {
      this.router.navigateByUrl(action.to as string);
    }
    else if (this.isFunction(action)) {
      action.function();
    }
  }
}
