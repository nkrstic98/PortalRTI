import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {first, skipLast} from 'rxjs/operators';
import {User} from '../../models/user';
import {Student} from '../../models/student';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  index: string;
  sType: string;
  status: string;

  user: User;

  submitted = false;

  studiesType = [ 'Osnovne akademske studije', 'Master akademske studije', 'Doktorske studije' ];
  studentStatus = [ 'Aktivan', 'Neaktivan' ];

  @Input() patternIndex: RegExp;
  @Input() patternUsername: RegExp;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.submitted = false;
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.password = '';
    this.index = '';
    this.sType = '';
    this.status = '';
  }

  register() {
    this.submitted = true;

    this.alertService.clear();

    if(this.firstname == '' || this.lastname == '' || this.username == '' || this.password == '' || this.index == '' || this.sType == '' ||
    this.status == '') {
      return;
    }

    if(this.validateUsername() != this.username) {
      this.alertService.error("Korisničko ime se ne poklapa sa ostalim unetim vrednostima");
      return;
    }

    let student: Student = {
      username: this.username,
      password: this.password,
      index: this.index,
      type: this.sType,
      firstname: this.firstname,
      lastname: this.lastname,
      status: this.status,
      subjects: []
    }

    this.accountService.registerStudent(student)
      .pipe(first())
      .subscribe({
        next: () => {
          if(this.user != null && this.user.type == 0) {
            this.alertService.success(
              'Student ' + this.firstname + ' ' + this.lastname + ' je uspešno registrovan', {keepAfterRouteChange: true, autoClose: true}
              );

            this.router.navigate(['../'], {relativeTo: this.route});
          }
          else {
            this.alertService.success('Uspešno ste se registrovali na portal', {keepAfterRouteChange: true, autoClose: true});
            this.router.navigate(['../login'], {relativeTo: this.route});
          }

        },
        error: err => {
          this.alertService.error('Korisničko ime "' + this.username + '" je zauzeto!');
        }
      });
  }

  validateUsername(): string {
    let usernameTemplate =
      this.lastname.charAt(0).toLowerCase() +
      this.firstname.charAt(0).toLowerCase() +
      this.index.substr(2, 2) +
      this.index.substr(5, 4);

    switch(this.sType) {
      case this.studiesType[0]: usernameTemplate += 'd'; break;
      case this.studiesType[1]: usernameTemplate += 'm'; break;
      case this.studiesType[2]: usernameTemplate += 'p'; break;
    }

    usernameTemplate += "@student.etf.rs";

    return usernameTemplate;
  }
}
