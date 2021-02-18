import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import {FormsModule} from '@angular/forms';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SubjectTeacherComponent } from './subject-teacher/subject-teacher.component';
import {SubjectModule} from '../subject/subject.module';
import {TextEditorModule} from '../helpers/text-editor/text-editor.module';
import { AddNewsComponent } from './add-news/add-news.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  exports: [
    MatSidenavModule
  ],
  declarations: [
    ProfileTeacherComponent,
    SubjectTeacherComponent,
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    NgDynamicBreadcrumbModule,
    SubjectModule,
    TextEditorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class TeacherModule { }
