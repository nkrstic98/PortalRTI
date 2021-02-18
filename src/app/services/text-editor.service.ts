import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {
  private textSubject: BehaviorSubject<string>;
  public text: Observable<string>;

  constructor() {
    this.textSubject = new BehaviorSubject<string>(null);
    this.text = this.textSubject.asObservable();
  }

  changeText(text) {
    this.textSubject.next(text);
  }

  public get textValue(): string {
    return this.textSubject.value;
  }
}
