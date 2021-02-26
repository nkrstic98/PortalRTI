import {Component, Input, OnInit} from '@angular/core';
import {Alert, AlertType} from '../../models/alert';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';
import {NavigationStart, Router} from '@angular/router';

/**
 * AlertComponent sluzi za prikazivanje razlicitog vida obavestenja
 * Ta obavestenja mogu biti uspesna akcija, upozorenje, obavestenje o gresci
 * Prateci AlertService sluzi za komunikaciju ostalih komponenti sa ovom
 */

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];

  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {

    //prijavi se na posmatranje alertova
    this.alertSubscription = this.alertService.onAlert(this.id).subscribe(alert => {

      //ako se primi prazan alert
      if(!alert.message) {
        //isfiltriraj alertove koji nemaju postavljen flag
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

        //obrisi flag sa preostalih alertova
        this.alerts.forEach(x => delete x.keepAfterRouteChange);

        return;
      }

      this.alerts.push(alert);

      if(alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), 3000);
      }
    });

    //ocisti alertove kada se promeni ruta
    this.routeSubscription = this.router.events.subscribe(event => {
      if(event instanceof  NavigationStart) {
        this.alertService.clear(this.id);
      }
    })

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {

    //ako je alert vec uklonjen, ne pokusavaj da ga uklonis ponovo
    if(!this.alerts.includes(alert)) return;

    if(this.fade) {
      alert.fade = true;

      setTimeout(() => { this.alerts = this.alerts.filter(x => x !== alert); }, 250);
    }
    else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if(!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
