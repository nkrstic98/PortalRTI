import { Component } from '@angular/core';
import {User} from './models/user';
import {AccountService} from './services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortalRTI';

  user: User;

  constructor(private accountService: AccountService, public router: Router) {
    this.accountService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.accountService.logout();
  }
}
