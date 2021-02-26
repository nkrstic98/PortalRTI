import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  /**
   * @private
   * u zavisnosti od promene stanja ovog Subjecta, menja se stanje i
   * text Observable objekta koji svim svojim subscriberima javlja da se desila
   * promena, i time vrednosti koje se unose u custom komponentu su uvek dosledne
   * i spremne da se posalju u bazu
   */
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
