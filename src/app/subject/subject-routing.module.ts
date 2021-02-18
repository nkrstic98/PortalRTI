import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectLecturesComponent} from './subject-lectures/subject-lectures.component';
import {EditSubjectComponent} from '../admin/subject-management/edit-subject/edit-subject.component';
import {SubjectExercisesComponent} from './subject-exercises/subject-exercises.component';

const routes: Routes = [
  {
    path: ':sifra/edit_about', component: EditSubjectComponent
  },
  {
    path: ':sifra/lectures', component: SubjectLecturesComponent
  },
  {
    path: ':sifra/exercises', component: SubjectExercisesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
