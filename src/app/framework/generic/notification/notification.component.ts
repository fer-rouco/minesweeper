import type { OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { Component, Inject, signal } from '@angular/core';
import { NotificationService } from '../notification.service';
import type { Notification} from '../notification-interface';
import { NotificationType } from '../notification-interface';
import { Subscription, mergeMap, map, tap, timer, of } from 'rxjs';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: false
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
