import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService) {
    if(this.accountService.userValue) {
      //this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
