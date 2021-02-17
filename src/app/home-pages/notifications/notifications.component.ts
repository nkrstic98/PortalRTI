import { Component, OnInit } from '@angular/core';
import {Notification} from '../../models/notification';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {NotificationService} from '../../services/notification.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  category = '';

  myNotifications: Notification[];
  filteredNotifications: Notification[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notifService.getAll()
      .pipe(first())
      .subscribe(notifications => {
        let refDate = new Date().getTime() - 7889400000;

        this.myNotifications = notifications.filter(n => new Date(n.creationTime).getTime() >= refDate);

        this.myNotifications.forEach(value => {
          let myDate = new Date(value.creationTime);
          value.time = myDate.toLocaleDateString() + ", " + myDate.getHours() + ":" + myDate.getMinutes();
        })

        this.filteredNotifications = this.myNotifications.sort((a, b) => b.time.localeCompare(a.time));
      });
  }

  filter() {
    this.filteredNotifications = this.myNotifications.filter(n => n.category == this.category);
  }

  reset() {
    this.category = '';
    this.filteredNotifications = this.myNotifications;
  }

}
