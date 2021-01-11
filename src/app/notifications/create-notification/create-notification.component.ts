import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {NotificationService} from '../../services/notification.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {
  title = '';
  category = '';
  text = '';

  submitted: boolean;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.submitted = true;

    this.alertService.clear();

    let notif = {
      title: this.title,
      category: this.category,
      text: this.text
    }

    this.notifService.create(notif)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Uspešno ste kreirali novo obaveštenje", {keepAfterRouteChange: false, autoClose: true})
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
  }

}
