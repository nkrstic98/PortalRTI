import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkerService} from '../../../services/worker.service';
import {AlertService} from '../../../services/alert.service';
import {first} from 'rxjs/operators';
import {Worker} from '../../../models/worker';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.css']
})
export class EditWorkerComponent implements OnInit {
  myWorker: Worker;
  workerEdit: string;

  workerImage: File = null;

  password = '';
  office = '';

  submitted: boolean;
  teacher: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerService: WorkerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.workerEdit = this.route.snapshot.params['username'];
    this.workerService.get(this.workerEdit)
      .pipe(first())
      .subscribe(worker => {
        this.myWorker = worker;

        this.office = this.myWorker.office;

        this.isTeacher();
      })
  }

  onFileSelected(event) {
    this.workerImage = <File>event.target.files[0];
  }

  edit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.password != '') {
      this.myWorker.password = this.password;
    }

    if (this.office != this.myWorker.office) {
      this.myWorker.office = this.office;
    }

    if(this.workerImage == null) {
      this.workerImage = null;
    }

    this.workerService.update(this.myWorker, this.workerImage)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Podaci o zaposlenom ' + this.myWorker.firstname + ' ' + this.myWorker.lastname + ' su uspešno izmenjeni', {autoClose: true}
          );
        },
        error: err => {
          this.alertService.error('ERROR');
        }
      });

  }


  isTeacher() {
    switch(this.myWorker.title)
    {
      case "redovni profesor":
      case "vanredni profesor":
      case "docent":
      case "asistent":
      case "saradnik u nastavi":
        this.teacher = true;
        this.office = this.myWorker.office;
        break;

      default:
        this.teacher = false;
        this.office = '';
        break;
    }
  }
}
