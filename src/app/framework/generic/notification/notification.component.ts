import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification, NotificationType } from '../notification-interface';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  public readonly NotificationType: typeof NotificationType = NotificationType;

  public notificationObject: Notification | null;

  private timeOutRef: any = undefined; // eslint-disable-line

  constructor(
    @Inject(NotificationService)
    private notificationService: NotificationService,
  ) {
    this.notificationObject = null;
  }

  ngOnInit(): void {
    this.notificationService
      .observable()
      .subscribe((notificationObject: Notification) => {
        this.notificationObject = notificationObject;
        this.timeOutRef = setTimeout(() => {
          this.notificationObject = null;
          this.clearNotificationTimeout();
        }, 5000);
      });
  }

  ngOnDestroy(): void {
    this.clearNotificationTimeout();
  }

  private clearNotificationTimeout() {
    clearTimeout(this.timeOutRef);
    this.timeOutRef = undefined;
  }
}
