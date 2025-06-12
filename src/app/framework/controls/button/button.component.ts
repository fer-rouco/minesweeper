import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'custom-button',
    template: `
      <button class='custom-button' title='button' (click)='handleClick()'  >
        <ng-content></ng-content>
      </button>
    `,
    styles: [`
      @import '../../../variables';

      .custom-button {
        margin: var(--control-margin);
        padding: var(--control-padding);

        border: var(--control-border);
        border-radius: var(--control-border-radius);

        cursor: pointer;
      }
    `]
})
export class CustomButtonComponent {
  @Input() public label: string = '';
  @Output() public click = new EventEmitter<string>();

  public handleClick(): void {
    this.click.emit();
  }
}
