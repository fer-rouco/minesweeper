import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../controls/button/button.component';
import type { Action, FunctionAction, Icon, Label, LinkAction } from '../../generic/generic-interface';
import { ActionType } from '../../generic/generic-interface';


@Component({
    selector: 'action',
    template: `
      @if (object) {
        @if (isTypeButton(object)) {
          <custom-button (click)="onActionClick(object)">
            <ng-container *ngTemplateOutlet="action"></ng-container>
          </custom-button>  
        }
        @else if (isTypeLink(object)) {
          <ng-container *ngTemplateOutlet="action"></ng-container>
        }
      }

      <ng-template #action>
        <div class="action" id={{object?.id}} >
          @if (object) {
            @if (isIcon(object)) {
              <i>
                <img class="icon" [src]="'assets/icons/' + object.icon">
              </i>
            }
            @if (isLabel(object)) {
              <span class="link" (click)="onActionClick(object)">{{ object.label }}</span>
            }
          }
        </div>
      </ng-template>
    `,
    styles: [`
      .action {
        display: inline;

        .link {
          text-decoration: underline;
          color: rgb(8, 82, 1);
          cursor: pointer;
        }
      },
    `],
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
