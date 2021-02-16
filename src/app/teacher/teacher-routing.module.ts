import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';
import {SubjectComponent} from '../subject/subject.component';

const routes: Routes = [
  {
    path: '', component: TeacherComponent,
    children: [
      {
        path: 'profile', component: ProfileTeacherComponent
      },
      {
        path: 'subjects', component: SubjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
