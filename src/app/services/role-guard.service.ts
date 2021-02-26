import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AccountService} from './account.service';

/**
 * RoleGuard servis sluzi za sticenje ruta od nedozvoljenog pristupa korisnika
 */

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;

    let user = JSON.parse(localStorage.getItem('user'));

    if(user != null) {
      if (user.type == expectedRole) {
        return true;
      }
    }

    localStorage.clear();
    this.accountService.setUserValue(null);
    this.router.navigate(['account/login']);
    return false;
  }
}
