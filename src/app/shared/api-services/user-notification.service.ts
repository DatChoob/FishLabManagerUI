import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

    userNotification: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

    getNotification(): Observable<Notification[]> {
        this.http.post(environment.endpoints.NOTIFICATION, null)
          .subscribe((notificationList: Notification[]) => {
              this.userNotification.next(notificationList)
          });
        return this.userNotification.asObservable();
      }
    
    deleteNotification() {
      this.http.delete(environment.endpoints.NOTIFICATION)
        .subscribe(() => this.userNotification.next([]));
    } 
      constructor(private http: HttpClient) { }
}
