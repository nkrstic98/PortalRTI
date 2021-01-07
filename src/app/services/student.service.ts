import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  uri = 'http://localhost:4000/students';

  constructor(private router: Router, private http: HttpClient) { }

  getAllStudents() {
    return this.http.get<Student[]>(`${this.uri}`);
  }

  filter(type, active) {
    let data = {
      type: type,
      active: active
    }

    return this.http.get<Student[]>(`${this.uri}/filter/${JSON.stringify(data)}`);
  }

  delete(student) {
    return this.http.post(`${this.uri}/delete`, {username: student});
  }

  get(username) {
    return this.http.get<Student>(`${this.uri}/${username}`);
  }

  update(student) {
    return this.http.post(`${this.uri}/update`, student);
  }
}
