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

  uri = 'http://localhost:4000';

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

  register(student: Student) {
    return this.http.post(`${this.uri}/registerStudent`, student);
  }
}
