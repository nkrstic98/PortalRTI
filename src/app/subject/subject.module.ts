import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SubjectComponent} from './subject.component';


@NgModule({
  declarations: [
    SubjectComponent
  ],
  exports: [
    SubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    MatSidenavModule
  ]
})
export class SubjectModule { }
