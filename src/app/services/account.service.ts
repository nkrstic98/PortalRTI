import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  uri = 'http://localhost:4000/account';

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http
      .post<User>(`${this.uri}/login`, data)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  changePass(password) {
    const data = {
      username: this.userValue.username,
      password: password,
      type: this.userValue.type
    }

    return this.http.put(`${this.uri}/changePass`, data);
  }

  registerStudent(student: Student) {
    return this.http.post(`${this.uri}/registerStudent`, student);
  }

  registerWorker(worker, workerImage: File) {
    console.log(workerImage);
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

    return this.http.post(`${this.uri}/registerWorker`, fd);
  }
}
