import type { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import type { Observable} from 'rxjs';
import { Subject, takeUntil } from 'rxjs';
import type { Notification} from './notification-interface';
import { NotificationType } from './notification-interface';
import type { Action } from './generic-interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private notification$ = new Subject<Notification | null>();

  ngOnDestroy(): void {
    const unsubscribe$: Subject<void> = new Subject<void>();
    this.notification$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
  }

  public add(type: NotificationType, message: string, action?: Action) {
    this.notification$.next({ type, message, action });
  }

  public addSuccess(message: string, action?: Action) {
    this.notification$.next({ type: NotificationType.SUCCESS, message, action });
  }

  public addInfo(message: string, action?: Action) {
    this.notification$.next({ type: NotificationType.INFO, message, action });
  }

  public addWarning(message: string, action?: Action) {
    this.notification$.next({ type: NotificationType.WARNING, message, action });
  }

  public addError(message: string, action?: Action) {
    this.notification$.next({ type: NotificationType.ERROR, message, action });
  }

  public observable(): Observable<Notification | null> {
    return this.notification$.asObservable();
  }

  public clear(): void {
    this.notification$.next(null);
  }

}
