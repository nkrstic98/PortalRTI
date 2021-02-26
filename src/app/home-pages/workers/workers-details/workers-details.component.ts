import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkerService} from '../../../services/worker.service';
import {Worker} from '../../../models/worker';
import {first} from 'rxjs/operators';
import {Schedule} from '../../../models/schedule';
import {Subject} from '../../../models/subject';
import {ScheduleService} from '../../../services/schedule.service';
import {SubjectService} from '../../../services/subject.service';

@Component({
  selector: 'app-workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.css']
})
export class WorkersDetailsComponent implements OnInit {
  teacher: Worker;
  schedule: Schedule[] = [];
  subjects: Subject[] = [];

  teacherSchedule: Array<Subject> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerService: WorkerService,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService
  ) {
    let username = this.route.snapshot.params['username'];
    this.workerService.get(username)
      .pipe(first())
      .subscribe(teacher => {
        this.teacher = teacher;

        this.scheduleService.getSchedule()
          .pipe(first())
          .subscribe((value: Schedule[]) => {
            this.schedule = value;

            this.subjectService.getAll()
              .pipe(first())
              .subscribe(value => {
                this.subjects = value;

                this.schedule.forEach(value => {
                  if(value.predavanja.find(p => p.zaposleni.find(t => t == this.teacher.username)) || value.vezbe.find(v => v.zaposleni.find(t => t == this.teacher.username))) {
                    if(this.teacherSchedule.find(v => v == this.subjects.find(s => s.sifra == value.predmet)) == undefined) {
                      this.teacherSchedule.push(this.subjects.find(s => s.sifra == value.predmet));
                    }
                  }
                })
              })
          })
      })
  }

  ngOnInit(): void {

  }

}
