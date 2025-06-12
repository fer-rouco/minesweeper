import type { OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { Component, Inject, signal } from '@angular/core';
import { Subscription, map, mergeMap, of, tap, timer } from 'rxjs';
import { ActionComponent } from '../../generic/action/action.component';
import type { Notification } from '../notification-interface';
import { NotificationType } from '../notification-interface';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'notification',
    template: `
      <div class="notification" >
        @if (notificationObject()) {
          <span 
            class="notification__message" 
            [class.success]="isType(NotificationType.SUCCESS)"
            [class.info]="isType(NotificationType.INFO)"
            [class.warning]="isType(NotificationType.WARNING)"
            [class.error]="isType(NotificationType.ERROR)"
          >
            {{notificationObject()?.message}} 
            <action [object]="notificationObject()?.action"></action>
          </span> 
        }
      </div>
    `,
    styles: [`
      @import '../../../variables';

      .notification {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 1rem;
        z-index: 1;

        &__message {
          border-radius: var(--border-radius);
          padding: 1rem;
          
          &.success {
            background-color: rgb(173, 255, 173);
          }

          &.info {
            background-color: rgb(158, 159, 255);
          }

          &.warning {
            background-color: rgb(253, 255, 158);
          }

          &.error {
            background-color: rgb(255, 183, 183);
          }
        }
      }
    `],
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
          return timer(5000000);
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
