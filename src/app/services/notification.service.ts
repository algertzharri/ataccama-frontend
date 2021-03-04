import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NotificationsService) { }

  showErrorMessage(title: string, message: string)
  {
    return this.notification.error(title, message);
  }

  showSuccessMessage(title: string, message: string)
  {
    return this.notification.success(title, message);
  }
}
