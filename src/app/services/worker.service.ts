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

    return this.http.get<Worker[]>(`${this.uri}/filter/${JSON.stringify(data)}`);
  }

  delete(worker) {
    return this.http.post(`${this.uri}/delete`, {username: worker});
  }

  get(username) {
    return this.http.get<Worker>(`${this.uri}/${username}`);
  }

  update(worker, workerImage) {
    console.log(workerImage)

    let fd = new FormData();
    fd.append('workerImage', workerImage);
    fd.append("firstname", worker.firstname);
    fd.append("lastname", worker.lastname);
    fd.append("username", worker.username);
    fd.append("email", worker.email);
    fd.append("title", worker.title);
    fd.append("status", worker.status);
    fd.append("office", worker.office);
    fd.append("address", worker.address);
    fd.append("phone", worker.phone);
    fd.append("website", worker.website);
    fd.append("password", worker.password);
    fd.append("biography", worker.biography);
    fd.append("workerImage", workerImage.name);

    return this.http.post(`${this.uri}/update`, fd);
  }
}
