import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Worker} from '../models/worker';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  uri = 'http://localhost:4000/workers';

  constructor(private router: Router, private http: HttpClient) { }

  getAllWorkers() {
    return this.http.get<Worker[]>(`${this.uri}`);
  }

  filter(type, active) {
    let data = {
      type: type,
      active: active
    }

    return this.http.get<Student[]>(`${this.uri}/filter/${JSON.stringify(data)}`);
  }

  delete(worker) {
    return this.http.post(`${this.uri}/delete`, {username: worker});
  }

  get(username) {
    return this.http.get<Worker>(`${this.uri}/${username}`);
  }

  update(worker) {
    return this.http.post(`${this.uri}/update`, worker);
  }
}
