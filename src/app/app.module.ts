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
import { CreateNotificationComponent } from './home-pages/notifications/create-notification/create-notification.component';
import { WorkersComponent } from './home-pages/workers/workers.component';
import { WorkersDetailsComponent } from './home-pages/workers/workers-details/workers-details.component';
import { TeacherComponent } from './teacher/teacher.component';

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
    CreateNotificationComponent,
    WorkersComponent,
    WorkersDetailsComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
