import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../services/teacher.service';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../models/subject';
import {first} from 'rxjs/operators';
import subject from '../../../../backend/src/model/subject';
import {NavigationStart, Router} from '@angular/router';
import {ScheduleService} from '../../services/schedule.service';
import {Schedule} from '../../models/schedule';

@Component({
  selector: 'app-subject-teacher',
  templateUrl: './subject-teacher.component.html',
  styleUrls: ['./subject-teacher.component.css']
})
export class SubjectTeacherComponent implements OnInit {
  mySubject = "";

  subjects: Subject[];
  schedule: Schedule[];

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private scheduleService: ScheduleService
  ) {
    // router.events.subscribe((event) => {
    //   if(event instanceof NavigationStart) {
    //     localStorage.removeItem('page');
    //     localStorage.removeItem('subject');
    //   }
    // })
  }

  ngOnInit(): void {
    this.router.navigate(['teacher/subjects']);

    this.subjectService.getAll()
      .pipe(first())
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects.sort((a, b) => a.sifra.localeCompare(b.sifra));
      })

    this.scheduleService.getSchedule()
      .pipe(first())
      .subscribe((schedule: Schedule[]) => {
        this.schedule = schedule;
      })
  }

  ngOnDestroy() {
    localStorage.removeItem('page');
    localStorage.removeItem('subject');
  }

  chooseSubject() {
    // console.log(this.mySubject);
    this.teacherService.getSubject(this.mySubject);
    localStorage.setItem('subject', this.mySubject);
    localStorage.setItem('page', JSON.stringify(2));
    // console.log(this.router);
    this.router.navigate(['teacher/subjects/' + this.mySubject + '/edit_about']);
  }

  getTeacherSubjects(): Subject[] {
    let teacherSchedule: Array<Subject> = [];

    let teacher = JSON.parse(localStorage.getItem('user'));

    this.schedule.forEach(value => {
      if(value.predavanja.find(p => p.zaposleni.find(t => t == teacher.username)) || value.vezbe.find(v => v.zaposleni.find(t => t == teacher.username))) {
        if(teacherSchedule.find(v => v == this.subjects.find(s => s.sifra == value.predmet)) == undefined) {
          teacherSchedule.push(this.subjects.find(s => s.sifra == value.predmet));
        }
      }
    })

    return teacherSchedule;
  }
}
