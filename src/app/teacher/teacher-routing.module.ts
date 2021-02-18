import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherComponent} from './teacher.component';
import {ProfileTeacherComponent} from './profile-teacher/profile-teacher.component';
import {SubjectTeacherComponent} from './subject-teacher/subject-teacher.component';
import {AddNewsComponent} from './add-news/add-news.component';

const subjectModule = () => import('../subject/subject.module').then(x => x.SubjectModule);

const routes: Routes = [
  {
    path: '', component: TeacherComponent,
    children: [
      {
        path: 'profile', component: ProfileTeacherComponent
      },
      {
        path: 'subjects', component: SubjectTeacherComponent, loadChildren: subjectModule
      },
      {
        path: 'addNews', component: AddNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
