import type { Action } from './generic-interface';

export enum NotificationType {
  SUCCESS = 0,
  INFO = 1,
  WARNING = 2,
  ERROR = 3,
}

export type Notification = {
  type: NotificationType;
  message: string;
  action?: Action;
};
