import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import {FormsModule} from '@angular/forms';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    NgDynamicBreadcrumbModule
  ]
})
export class TeacherModule { }
