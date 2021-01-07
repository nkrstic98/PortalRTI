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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    HeaderDefaultComponent,
    HeaderAdminComponent,
    HeaderTeacherComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
