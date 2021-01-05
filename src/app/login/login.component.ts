import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {User, UserType} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if(this.form.invalid) {
      return;
    }

    this.loginService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: User) => {
        if(user) {
          switch (user.type)
          {
            case UserType.Student:
              break;

            case UserType.Worker:
              break;
          }

          this.router.navigate(['/home']);
        }
        else {
          this.alertService.error("Korisničko ime ili lozinka nisu ispravni");
          this.f.password.setValue('');
          this.submitted = false;
        }
      });

  }

}
