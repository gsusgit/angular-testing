import {
  getClassForNotificationStatus,
  NotificationStatus,
  StatusClass,
} from '@ab/util/valueToCSS';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  public transformer = getClassForNotificationStatus;

  transform(value: NotificationStatus, ...args: unknown[]): StatusClass {
    return this.transformer(value);
  }
}
