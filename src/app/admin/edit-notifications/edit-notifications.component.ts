import { Component, OnInit } from '@angular/core';
import {TextEditorService} from '../../services/text-editor.service';
import {NotificationService} from '../../services/notification.service';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';
import {Notification} from '../../models/notification';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-notifications',
  templateUrl: './edit-notifications.component.html',
  styleUrls: ['./edit-notifications.component.css']
})
export class EditNotificationsComponent implements OnInit {

  page = 0;
  nextE = true;
  prevE = false;

  newText = '';

  subscription: Subscription;

  notifications: Notification[] = [];

  image: File = null;

  submitted = false;

  constructor(
    private textEditorService: TextEditorService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) {
    this.subscription = this.textEditorService.text.subscribe(value => this.newText = value);
  }

  ngOnInit(): void {
    this.notificationService.getAll()
      .pipe(first())
      .subscribe(notif => {
        let refDate = new Date(Date.now()).getTime() - 7889400000;
        this.notifications = notif.filter(n => new Date(n.creationTime).getTime() >= refDate);

        if(this.notifications.length > 0) {
          this.textEditorService.changeText(this.notifications[0].text);
        }

        this.page = 0;
        this.prevE = false;
        if (this.notifications.length > 1) {
          this.nextE = true;
        }
        else {
          this.nextE = false;
        }
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFileSelected(event) {
    this.image = <File>event.target.files[0];
  }

  updateNotification() {
    if(this.image != null) {
      this.notifications[this.page].image = this.image.name;
    }
    this.notifications[this.page].text = this.newText;

    console.log(this.notifications[this.page]);

    this.notificationService.update(this.notifications[this.page], this.image)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Uspešno ste ažurirali obaveštenje", {autoClose: true});
          this.image = null;
        },
        error: err => {
          this.alertService.error("Desila se greška priliom ažuriranja obaveštenja");
        }
      })
  }

  nextPage() {
    if(this.page == this.notifications.length - 1) {
      this.nextE = false;
    }
    else {
      this.page++;
      if(this.page == this.notifications.length - 1) {
        this.nextE = false;
      }
    }

    this.prevE = true;

    this.textEditorService.changeText(this.notifications[this.page].text);
  }

  prevPage() {
    if(this.page == 0) {
      this.prevE = false;
    }
    else {
      this.page--;
      if(this.page == 0) {
        this.prevE = false;
      }
    }

    this.nextE = true;

    this.textEditorService.changeText(this.notifications[this.page].text);
  }

}
