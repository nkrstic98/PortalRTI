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
import { SubjectLabComponent } from './subject-lab/subject-lab.component';
import {TextEditorModule} from '../helpers/text-editor/text-editor.module';
import { SubjectProjectComponent } from './subject-project/subject-project.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLabel} from '@angular/material/form-field';


@NgModule({
  declarations: [
    SubjectComponent,
    SubjectAboutComponent,
    SubjectLecturesComponent,
    SubjectExercisesComponent,
    SubjectExamsComponent,
    SubjectLabComponent,
    SubjectProjectComponent
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
    FormsModule,
    TextEditorModule,
    MatDatepickerModule
  ]
})
export class SubjectModule { }
