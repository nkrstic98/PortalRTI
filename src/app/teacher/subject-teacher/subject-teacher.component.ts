import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../services/teacher.service';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../models/subject';
import {first} from 'rxjs/operators';
import subject from '../../../../backend/src/model/subject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject-teacher',
  templateUrl: './subject-teacher.component.html',
  styleUrls: ['./subject-teacher.component.css']
})
export class SubjectTeacherComponent implements OnInit {
  mySubject = "";

  subjects: Subject[];

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['teacher/subjects']);

    this.subjectService.getAll()
      .pipe(first())
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects.sort((a, b) => a.sifra.localeCompare(b.sifra));
      })
  }

  chooseSubject() {
    // console.log(this.mySubject);
    this.teacherService.getSubject(this.mySubject);
    // console.log(this.router);
    this.router.navigate(['teacher/subjects/' + this.mySubject + '/edit_about']);
  }
}
