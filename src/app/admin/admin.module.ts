import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import {FormsModule} from '@angular/forms';
import { EditStudentComponent } from './student-management/edit-student/edit-student.component';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';


@NgModule({
  declarations: [
    AdminComponent,
    HomeAdminComponent,
    StudentManagementComponent,
    EditStudentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgDynamicBreadcrumbModule
  ]
})
export class AdminModule { }
