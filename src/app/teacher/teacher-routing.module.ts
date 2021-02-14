import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';

const routes: Routes = [
  {
    path: '', component: TeacherComponent,
    children: [
      { path: 'profile', component: ProfileTeacherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
