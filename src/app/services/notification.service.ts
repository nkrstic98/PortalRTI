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

  create(notification, image) {
    let fd = new FormData();
    fd.append('title', notification.title);
    fd.append('category', notification.category);
    fd.append('text', notification.text);
    fd.append('image', notification.image);
    fd.append('notifImage', image);


    return this.http.post(`${this.uri}/create`, fd);
  }

  getAll(){
    return this.http.get<Notification[]>(`${this.uri}`);
  }

}
