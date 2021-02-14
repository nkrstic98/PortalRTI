import { Component, OnInit } from '@angular/core';
import {Worker} from '../models/worker';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {WorkerService} from '../services/worker.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  workers: Worker[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.workerService.getAllWorkers()
      .pipe(first())
      .subscribe(workers => {
        this.workers = workers;
        this.workers.sort((a, b) => a.firstname.localeCompare(b.firstname));
      })
  }
}
