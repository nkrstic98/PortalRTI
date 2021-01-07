import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    HomeAdminComponent,
    StudentManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
