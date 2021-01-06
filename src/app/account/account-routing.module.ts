import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import {LoginComponent} from './login/login.component';
import {ChangePassComponent} from './change-pass/change-pass.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'change_pass', component: ChangePassComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
