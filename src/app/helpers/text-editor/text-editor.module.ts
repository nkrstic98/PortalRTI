import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextEditorComponent} from './text-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';



@NgModule({
  declarations: [TextEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule
  ],
  exports: [TextEditorComponent]
})
export class TextEditorModule { }
