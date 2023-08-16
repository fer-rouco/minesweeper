import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Notification, NotificationType } from './notification-interface';
import { Link } from './link-interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private notification$ = new Subject<Notification>();

  ngOnDestroy(): void {
    let unsubscribe$: Subject<void> = new Subject<void>();
    this.notification$.pipe(takeUntil(unsubscribe$)).subscribe(() => {});
  }

  public add(type: NotificationType, message: string, link?: Link) {
    this.notification$.next({ type, message, link });
  }

  public addSuccess(message: string, link?: Link) {
    this.notification$.next({ type: NotificationType.SUCCESS, message, link });
  }
  
  public addInfo(message: string, link?: Link) {
    this.notification$.next({ type: NotificationType.INFO, message, link });
  }
  
  public addWarning(message: string, link?: Link) {
    this.notification$.next({ type: NotificationType.WARNING, message, link });
  }

  public addError(message: string, link?: Link) {
    this.notification$.next({ type: NotificationType.ERROR, message, link });
  }

  public observable(): Observable<Notification> {
    return this.notification$.asObservable();
  }
}
