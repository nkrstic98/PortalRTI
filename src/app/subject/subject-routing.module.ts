import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectAboutComponent} from './subject-about/subject-about.component';
import {SubjectLecturesComponent} from './subject-lectures/subject-lectures.component';

const routes: Routes = [
  {
    path: ':subject/about', component: SubjectAboutComponent
  },
  {
    path: ':subject/lectures', component: SubjectLecturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
