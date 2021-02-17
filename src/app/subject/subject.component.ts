import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Subject} from '../models/subject';
import {TeacherService} from '../services/teacher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  page: Number;
  links = [ 'notifications', 'edit_about', 'lectures', 'excercises', 'exams', 'labs', 'projects' ];

  user: User;
  subject: Subject;

  constructor(
    private router: Router,
    private teacherService: TeacherService
  ) {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);

    this.teacherService.subject.subscribe(subject => {
      this.subject = subject;
      localStorage.setItem('subject', JSON.stringify(this.subject));
      // console.log(this.subject);
      if(this.user.type == 2) {
        this.page = 1;
      }
      else {
        this.page = 2;
      }
    });

  }

  ngOnInit(): void {

  }

  changePage(val) {
    this.page = val;
    this.router.navigate(['teacher/subjects/' + this.subject.sifra + '/' + this.links[val - 1]]);
  }
}
