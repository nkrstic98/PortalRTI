import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkerService} from '../../../services/worker.service';
import {Worker} from '../../../models/worker';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.css']
})
export class WorkersDetailsComponent implements OnInit {
  teacher: Worker;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    let username = this.route.snapshot.params['username'];
    this.workerService.get(username)
      .pipe(first())
      .subscribe(teacher => {
        this.teacher = teacher;
    })
  }

}
