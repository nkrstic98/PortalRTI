import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './helpers/alert/alert.component';
import { HeaderDefaultComponent } from './headers/header-default/header-default.component';
import { HeaderAdminComponent } from './headers/header-admin/header-admin.component';
import { HeaderTeacherComponent } from './headers/header-teacher/header-teacher.component';
import { ContactComponent } from './contact/contact.component';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateNotificationComponent } from './notifications/create-notification/create-notification.component';
import { WorkersComponent } from './workers/workers.component';
import { WorkersDetailsComponent } from './workers/workers-details/workers-details.component';

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
    WorkersDetailsComponent
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
