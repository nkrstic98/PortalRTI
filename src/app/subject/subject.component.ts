import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Subject} from '../models/subject';
import {TeacherService} from '../services/teacher.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  user: User;

  subject: Subject;

  constructor(
    private teacherService: TeacherService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);

    this.teacherService.subject.subscribe(subject => {
      this.subject = subject;
      // console.log(this.subject);
    });

  }

  ngOnInit(): void {

  }
}
