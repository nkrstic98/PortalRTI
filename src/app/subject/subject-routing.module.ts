import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectLecturesComponent} from './subject-lectures/subject-lectures.component';
import {EditSubjectComponent} from '../admin/subject-management/edit-subject/edit-subject.component';
import {SubjectExercisesComponent} from './subject-exercises/subject-exercises.component';
import {SubjectExamsComponent} from './subject-exams/subject-exams.component';
import {SubjectLabComponent} from './subject-lab/subject-lab.component';
import {SubjectProjectComponent} from './subject-project/subject-project.component';

const routes: Routes = [
  {
    path: ':sifra/edit_about', component: EditSubjectComponent
  },
  {
    path: ':sifra/lectures', component: SubjectLecturesComponent
  },
  {
    path: ':sifra/exercises', component: SubjectExercisesComponent
  },
  {
    path: ':sifra/exams', component: SubjectExamsComponent
  },
  {
    path: ':sifra/labs', component: SubjectLabComponent
  },
  {
    path: ':sifra/projects', component: SubjectProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
