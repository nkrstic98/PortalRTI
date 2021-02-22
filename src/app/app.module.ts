import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home-pages/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './helpers/alert/alert.component';
import { HeaderDefaultComponent } from './headers/header-default/header-default.component';
import { HeaderAdminComponent } from './headers/header-admin/header-admin.component';
import { HeaderTeacherComponent } from './headers/header-teacher/header-teacher.component';
import { ContactComponent } from './home-pages/contact/contact.component';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';
import { NotificationsComponent } from './home-pages/notifications/notifications.component';
import { WorkersComponent } from './home-pages/workers/workers.component';
import { WorkersDetailsComponent } from './home-pages/workers/workers-details/workers-details.component';
import { TeacherComponent } from './teacher/teacher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ScienceResearchComponent } from './home-pages/science-research/science-research.component';
import { ScienceProjectsComponent } from './home-pages/science-projects/science-projects.component';
import { ProjectsComponent } from './home-pages/projects/projects.component';
import { SubjectsListComponent } from './home-pages/subjects-list/subjects-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    HeaderDefaultComponent,
    HeaderAdminComponent,
    HeaderTeacherComponent,
    ContactComponent,
    NotificationsComponent,
    WorkersComponent,
    WorkersDetailsComponent,
    TeacherComponent,
    ScienceResearchComponent,
    ScienceProjectsComponent,
    ProjectsComponent,
    SubjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  exports: [MatSidenavModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
