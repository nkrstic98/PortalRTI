import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {first} from 'rxjs/operators';
import {TeacherService} from '../../services/teacher.service';
import {ScheduleService} from '../../services/schedule.service';
import {Schedule} from '../../models/schedule';
import {WorkerService} from '../../services/worker.service';
import {Worker} from '../../models/worker';

@Component({
  selector: 'app-subject-about',
  templateUrl: './subject-about.component.html',
  styleUrls: ['./subject-about.component.css']
})
export class SubjectAboutComponent implements OnInit {
  semestri = [ "I Semestar", "II Semestar", "III Semestar", "IV Semestar", "V Semestar", "VI Semestar", "VII Semestar", "VII Semestar" ];

  subject: Subject;
  schedule: Schedule[];
  workers: Worker[];

  constructor(
    private teacherService: TeacherService,
    private scheduleService: ScheduleService,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.teacherService.subject.subscribe(val => this.subject = val);

    this.scheduleService.getScheduleForSubject(this.subject.sifra)
      .pipe(first())
      .subscribe((value: Schedule[]) => {
        this.schedule = value;
        console.log(this.schedule)
      })

    this.workerService.getAllWorkers()
      .pipe(first())
      .subscribe((value:Worker[]) => this.workers = value)
  }

  getTeacher(username): string {
    let teacher = this.workers.find(value => value.username == username);

    return teacher.firstname + " " + teacher.lastname;
  }

}
