import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  uri = 'http://localhost:4000/subjects';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Subject[]>(`${this.uri}`);
  }

  addSubject(subject) {
    return this.http.post(`${this.uri}/addSubject`, subject);
  }

  delete(subject) {
    return this.http.post(`${this.uri}/delete`, {sifra: subject});
  }
}
