import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  uri = 'http://localhost:4000/schedule';

  constructor(
    private http: HttpClient
  ) { }

  addSchedule(schedule) {
    return this.http.post(`${this.uri}/addSchedule`, {schedule : schedule});
  }

  getScheduleForSubject(subject) {
    return this.http.get(`${this.uri}/get/${subject}`);
  }

  getSchedule() {
    return this.http.get(`${this.uri}`);
  }
}
