import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Subscription} from 'rxjs';
import {TextEditorService} from '../../services/text-editor.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  htmlContent = '';

  subscription: Subscription;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull'
      ],
      [
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo'
      ]
    ]
  };

  constructor(
    private textEditorService: TextEditorService
  ) {}

  ngOnInit(): void {
    this.subscription = this.textEditorService.text.subscribe(value => this.htmlContent = value)
    console.log(this.htmlContent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeText(event) {
    this.textEditorService.changeText(event);
    // console.log("Event: " + event);
    // console.log("Html content: " + this.htmlContent);
  }
}
