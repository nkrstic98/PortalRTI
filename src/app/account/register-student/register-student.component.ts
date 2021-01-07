import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import user from '../../../../backend/src/model/user';
import {User} from '../../models/user';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  user: User;

  form: FormGroup;

  submitted = false;

  studiesType = [ 'Osnovne akademske studije', 'Master akademske studije', 'Doktorske studije' ];
  studentStatus = [ 'Aktivan', 'Neaktivan' ];

  @Input() patternIndex: RegExp;
  @Input() patternUsername: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      index: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    if(this.validateUsername() != this.form.value.username) {
      this.alertService.error("Korisničko ime se ne poklapa sa ostalim unetim vrednostima");
      return;
    }

    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          if(this.user != null && this.user.type == 0) {
            this.alertService.success(
              'Student ' + this.f.firstname.value + ' ' + this.f.lastname.value + ' je uspešno registrovan', {keepAfterRouteChange: true, autoClose: true}
              );

            this.router.navigate(['../../admin/studentManagement'], {relativeTo: this.route});
          }
          else {
            this.alertService.success('Uspešno ste se registrovali na portal', {keepAfterRouteChange: true, autoClose: true});
            this.router.navigate(['../login'], {relativeTo: this.route});
          }

        },
        error: err => {
          this.alertService.error('Korisničko ime "' + this.form.value.username + '" je zauzeto!');
        }
      });
  }

  validateUsername(): string {
    let usernameTemplate =
      this.form.value.lastname.charAt(0).toLowerCase() +
      this.form.value.firstname.charAt(0).toLowerCase() +
      this.form.value.index.substr(2, 2) +
      this.form.value.index.substr(5, 4);

    switch(this.form.value.type) {
      case this.studiesType[0]: usernameTemplate += 'd'; break;
      case this.studiesType[1]: usernameTemplate += 'm'; break;
      case this.studiesType[2]: usernameTemplate += 'p'; break;
    }

    usernameTemplate += "@student.etf.rs";

    return usernameTemplate;
  }
}
