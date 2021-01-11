import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Notification} from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  uri = 'http://localhost:4000/notifications';

  constructor(private router: Router, private http: HttpClient) { }

  create(notification) {
    return this.http.post(`${this.uri}/create`, notification);
  }

  getAll(){
    return this.http.get<Notification[]>(`${this.uri}`);
  }

}
