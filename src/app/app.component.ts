import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './framework/generic/notification/notification.component';

@Component({
    selector: 'app-root',
    template: `
      <div class="app">
        <notification></notification>
        <router-outlet></router-outlet>
      </div>
    `,
    styles: [`
      .app {
        height: 100%;
        display: flex;
        justify-content: center; 
        padding: .5rem;
      }
    `],
    imports: [RouterModule, NotificationComponent]
})
export class AppComponent {
  public title: string = 'minesweeper';
}
