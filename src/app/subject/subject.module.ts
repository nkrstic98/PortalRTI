import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SubjectComponent} from './subject.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SubjectAboutComponent } from './subject-about/subject-about.component';
import { SubjectLecturesComponent } from './subject-lectures/subject-lectures.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SubjectExercisesComponent } from './subject-exercises/subject-exercises.component';
import { SubjectExamsComponent } from './subject-exams/subject-exams.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SubjectComponent,
    SubjectAboutComponent,
    SubjectLecturesComponent,
    SubjectExercisesComponent,
    SubjectExamsComponent
  ],
  exports: [
    SubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    MatSidenavModule,
    MatTooltipModule,
    DragDropModule,
    FormsModule
  ]
})
export class SubjectModule { }
