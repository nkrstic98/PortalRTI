import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subject} from '../models/subject';
import {HttpClient} from '@angular/common/http';
import {SubjectService} from './subject.service';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private predmetSubject: BehaviorSubject<Subject>;
  public subject: Observable<Subject>;

  constructor(
    private http: HttpClient,
    private subjectService: SubjectService
  ) {
    this.predmetSubject = new BehaviorSubject<Subject>(null);
    this.subject = this.predmetSubject.asObservable();
  }

  getSubject(subject) {
    this.subjectService.getSubject(subject)
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.predmetSubject.next(subject);
      })
  }

  setSubject(subject) {
    this.predmetSubject.next(subject);
  }

  public get subjectValue(): Subject {
    return this.predmetSubject.value;
  }
}
