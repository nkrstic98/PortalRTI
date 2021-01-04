import { Component } from '@angular/core';
import {User} from './models/user';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortalRTI';

  user: User;

  constructor(private loginService: LoginService) {
    this.loginService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.loginService.logout();
  }
}
