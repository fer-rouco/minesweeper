import type { OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { Component, Inject, signal } from '@angular/core';
import { Subscription, map, mergeMap, of, tap, timer } from 'rxjs';
import { ActionComponent } from '../../generic/action/action.component';
import type { Notification } from '../notification-interface';
import { NotificationType } from '../notification-interface';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    imports: [ActionComponent]
})
export class NotificationComponent implements OnInit, OnDestroy {
  public readonly NotificationType: typeof NotificationType = NotificationType;

  public notificationObject: WritableSignal<Notification | null> = signal(null);

  public notificationSubscription: Subscription = Subscription.EMPTY;

  constructor(
    @Inject(NotificationService)
    private notificationService: NotificationService,
  ) {
    this.notificationObject.set(null);
  }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService
      .observable().pipe(
        map((notificationObject: Notification | null) => {
          this.notificationObject.set(notificationObject);
          return notificationObject;
        }),
        mergeMap((notificationObject: Notification | null) => {
          if (!notificationObject) {
            return of(null);
          }
          return timer(5000);
        }),
        tap(() => {
          this.notificationObject.set(null);
        }),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

  isType(type: NotificationType): boolean {
    return this.notificationObject()?.type === type;
  }

}
