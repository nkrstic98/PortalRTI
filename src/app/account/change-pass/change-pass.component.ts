import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if(this.form.invalid) {
      return;
    }

    if(this.f.oldPassword.value != this.accountService.userValue.password) {
      this.alertService.error("Molimo vas unesite ispravnu lozinku");
      this.form.reset();
      return;
    }

    if(this.f.oldPassword.value == this.f.newPassword.value) {
      this.alertService.error("Stara i nova lozinka ne mogu biti iste");
      this.form.reset();
      return;
    }

    if(this.f.newPassword.value != this.f.newPasswordConfirm.value) {
      this.alertService.error("Lozinka i potvrda lozinke se ne poklapaju");
      this.form.reset();
      return;
    }

    this.accountService
      .changePass(this.f.newPassword.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.accountService.logout();
          this.router.navigate(['account/login']);
          this.alertService.success("Lozinka je uspešno promenjena");
        },
        error: err => {
          this.alertService.error(err);
        }
        }
      )
  }
}
