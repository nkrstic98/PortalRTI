import { Component, OnInit } from '@angular/core';
import {Worker} from '../../models/worker';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {WorkerService} from '../../services/worker.service';
import {first} from 'rxjs/operators';
import {ScheduleService} from '../../services/schedule.service';
import {Schedule} from '../../models/schedule';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../models/subject';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  workers: Worker[] = [];
  schedule: Schedule[] = [];
  subjects: Subject[] = [];

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService
  ) {
    this.workerService.getAllWorkers()
      .pipe(first())
      .subscribe(workers => {
        this.workers = workers;
        this.workers.sort((a, b) => a.firstname.localeCompare(b.firstname));
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

  ngOnInit(): void {

  }

  getTeacherSubjects(teacher): Subject[] {

    let teacherSchedule: Array<Subject> = [];

    this.schedule.forEach(value => {
      if(value.predavanja.find(p => p.zaposleni.find(t => t == teacher)) || value.vezbe.find(v => v.zaposleni.find(t => t == teacher))) {
        if(teacherSchedule.find(v => v == this.subjects.find(s => s.sifra == value.predmet)) == undefined) {
          teacherSchedule.push(this.subjects.find(s => s.sifra == value.predmet));
        }
      }
    })

    return teacherSchedule;
  }
}
