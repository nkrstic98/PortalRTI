import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {ChangePassComponent} from './change-pass/change-pass.component';
import { AccountComponent } from './account.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterWorkerComponent } from './register-worker/register-worker.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePassComponent,
    AccountComponent,
    RegisterStudentComponent,
    RegisterWorkerComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
