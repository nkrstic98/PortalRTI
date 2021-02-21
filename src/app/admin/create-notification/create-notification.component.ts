import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {NotificationService} from '../../services/notification.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TextEditorService} from '../../services/text-editor.service';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {
  title = '';
  category = '';
  text = '';

  image: File = null;

  submitted: boolean;

  subscription: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private notifService: NotificationService,
    private textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
    this.subscription = this.textEditorService.text.subscribe(value => this.text = value);
  }

  create() {
    this.submitted = true;

    this.alertService.clear();

    let image_name;
    if(this.image != null) {
      image_name = this.image.name;
    }
    else {
      image_name = "";
    }

    let notif = {
      title: this.title,
      category: this.category,
      text: this.text,
      image: image_name
    }

    this.notifService.create(notif, this.image)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Uspešno ste kreirali novo obaveštenje", {keepAfterRouteChange: false, autoClose: true})
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
    this.title = '';
    this.category = '';
    this.textEditorService.changeText(null);
    this.submitted = false;
  }

  onFileSelected(event) {
    this.image = <File>event.target.files[0];
  }

}
