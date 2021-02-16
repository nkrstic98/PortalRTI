import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-subject-teacher',
  templateUrl: './subject-teacher.component.html',
  styleUrls: ['./subject-teacher.component.css']
})
export class SubjectTeacherComponent implements OnInit {
  mySubject = "";

  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
  }

  chooseSubject() {
    console.log(this.mySubject);
    this.teacherService.getSubject(this.mySubject);
  }
}
