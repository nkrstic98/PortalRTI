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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerService: WorkerService,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    let username = this.route.snapshot.params['username'];
    this.workerService.get(username)
      .pipe(first())
      .subscribe(teacher => {
        this.teacher = teacher;
    })

    this.scheduleService.getSchedule()
      .pipe(first())
      .subscribe((value: Schedule[]) => {
        this.schedule = value;
      })

    this.subjectService.getAll()
      .pipe(first())
      .subscribe(value => {
        this.subjects = value;
      })
  }

  getTeacherSubjects(): Subject[] {

    let teacherSchedule: Array<Subject> = [];

    this.schedule.forEach(value => {
      if(value.predavanja.find(p => p.zaposleni.find(t => t == this.teacher.username)) || value.vezbe.find(v => v.zaposleni.find(t => t == this.teacher.username))) {
        teacherSchedule.push(this.subjects.find(s => s.sifra == value.predmet));
      }
    })

    return teacherSchedule;
  }
}
