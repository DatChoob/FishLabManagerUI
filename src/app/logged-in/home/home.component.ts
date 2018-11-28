import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialogs.service';
import { Observable } from 'rxjs';

// to import things from service
import { HomepageService } from '../../shared/api-services/homepage.service';
import { FishFeed } from '../../shared/models/fish-feed';
import { AuthService } from '../../shared/auth.service';
import { NgForm } from '@angular/forms';
import { cloneDeep } from "lodash";
import { MatSnackBar } from '@angular/material';
import { UserNotificationService } from '../../shared/api-services/user-notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']


})

export class HomeComponent implements OnInit {

  constructor(private dialogService: DialogService, private homepageService: HomepageService, public snackBar: MatSnackBar, public authService: AuthService, private userNotificationService: UserNotificationService) { }

  fishfeed: FishFeed;
  notifications: Notification[];
  ngOnInit() {
    this.homepageService.getLatestStatus().subscribe(newFishFeed => {
      console.log(newFishFeed);
      this.fishfeed = cloneDeep(newFishFeed)
    });
    this.userNotificationService.getNotification().subscribe(notificationList => {
      this.notifications = notificationList;
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.fishfeed.status = form.value.status
      this.homepageService.updateStatus(this.fishfeed).subscribe(newFishFeed => {
        console.log(newFishFeed);
        this.fishfeed = cloneDeep(newFishFeed)
        this.snackBar.open("Saved", "", { duration: 1000 });
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  clearNotifications() {
    this.openDialog().subscribe(userConfirmed => {
      if(userConfirmed){
        this.userNotificationService.deleteNotification();
      }
  }
    );
}

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }
}