import { Link } from "./link-interface";

export enum NotificationType {
  SUCCESS = 0,
  INFO = 1,
  WARNING = 2,
  ERROR = 3,
};

export type Notification = { type: NotificationType, message: string, link?: Link };