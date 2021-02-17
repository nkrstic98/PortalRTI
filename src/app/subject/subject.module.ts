import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SubjectComponent} from './subject.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SubjectAboutComponent } from './subject-about/subject-about.component';
import { SubjectLecturesComponent } from './subject-lectures/subject-lectures.component';


@NgModule({
  declarations: [
    SubjectComponent,
    SubjectAboutComponent,
    SubjectLecturesComponent
  ],
  exports: [
    SubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    MatSidenavModule,
    MatTooltipModule
  ]
})
export class SubjectModule { }