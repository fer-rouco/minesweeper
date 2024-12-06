import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './framework/generic/notification/notification.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterModule, NotificationComponent]
})
export class AppComponent {
  public title: string = 'minesweeper';
}
