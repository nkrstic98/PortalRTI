import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import {FormsModule} from '@angular/forms';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  exports: [
    MatSidenavModule
  ],
  declarations: [ProfileTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    NgDynamicBreadcrumbModule
  ]
})
export class TeacherModule { }
