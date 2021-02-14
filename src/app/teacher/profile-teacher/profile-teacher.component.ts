import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Worker} from '../../models/worker';
import {Router} from '@angular/router';
import {WorkerService} from '../../services/worker.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {
  user: User;
  teacher: Worker;

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.workerService.get(this.user.username)
      .pipe(first())
      .subscribe(value => {
        this.teacher = value;
      })
  }

  updateProfile() {
    this.workerService.update(this.teacher)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            "Uspešno ste izmenili svoje podatke", {autoClose: true}
          );
        },
        error: err => {
          this.alertService.error('ERROR');
        }
      });
  }
}
