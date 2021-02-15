import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.css']
})
export class RegisterWorkerComponent implements OnInit {
  firstname = '';
  lastname = '';
  username = '';
  password = '';
  passwordC = '';
  address = '';
  phone = '';
  website = '';
  biogrpahy = '';
  title = '';
  office = '';
  status = '';
  email = '';

  workerImage: File = null;

  submitted: boolean;
  teacher: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.submitted = true;

    this.alertService.clear();

    if(this.password != this.passwordC ) {
      this.alertService.error('Lozinka i potvrda lozinke se ne poklapaju');
      return;
    }

    if(this.username == "" || this.lastname == "" || this.username == "" || this.title == "" || this.status == "" || this.address == "" ||
      this.password == "" || this.passwordC == "") {
      return;
    }

    let worker = {
      username: this.username,
      password: this.password,
      email: this.username + "@etf.bg.ac.rs",
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      phone: this.phone,
      website: this.website,
      biography: this.biogrpahy,
      title: this.title,
      office: this.office,
      status: this.status
    }

    this.accountService.registerWorker(worker, this.workerImage)
      .pipe(first())
      .subscribe({
        next: worker => {
          if (worker) {
              this.alertService.error(
                'Korisničko ime "' + this.username + '" je zauzeto!'
              );
          }
          else {
            this.alertService.success(
              'Zaposleni ' + this.firstname + ' ' + this.lastname + ' je uspešno registrovan', {keepAfterRouteChange: true, autoClose: true}
            );

            this.router.navigate(['../'], {relativeTo: this.route});

          }
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
  }

  isTeacher() {
    switch(this.title)
    {
      case "redovni profesor":
      case "vanredni profesor":
      case "docent":
      case "asistent":
      case "saradnik u nastavi":
        this.teacher = true;
        break;

      default:
        this.teacher = false;
        this.office = null;
        break;
    }
  }

  onFileSelected(event) {
    //console.log(event);
    this.workerImage = <File>event.target.files[0];
  }
}
