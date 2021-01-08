import { Component, OnInit } from '@angular/core';
import {WorkerService} from '../../services/worker.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-worker-management',
  templateUrl: './worker-management.component.html',
  styleUrls: ['./worker-management.component.css']
})
export class WorkerManagementComponent implements OnInit {
  workers = null;

  type = null;
  active = false;

  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workerService.getAllWorkers()
      .pipe(first())
      .subscribe(workers => {
        this.workers = workers.sort((a, b) => a.lastname.localeCompare(b.lastname));
      });
  }

  showActiveOnly() {
    this.active = !this.active;
    this.filter();
  }

  getByTitle(title) {
    this.type = title.target.value;
    this.filter();
  }

  filter() {
    this.workerService.filter(this.type, this.active)
      .pipe(first())
      .subscribe(workers => {
        this.workers = workers.sort((a, b) => a.lastname.localeCompare(b.lastname));
      });
  }

  reset() {
    this.active = false;
    this.type = null;

    this.ngOnInit();
  }

  delete(worker) {
    this.workerService.delete(worker)
      .pipe(first())
      .subscribe(
        () => this.workers = this.workers
          .filter(x => x.username != worker)
          .sort((a, b) => a.lastname.localeCompare(b.lastname))
      );
  }

}
