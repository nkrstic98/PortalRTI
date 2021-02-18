import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Subject} from '../models/subject';
import {TeacherService} from '../services/teacher.service';
import {Router} from '@angular/router';
import {SubjectService} from '../services/subject.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  page: Number;
  links = [ 'notifications', 'edit_about', 'lectures', 'exercises', 'exams', 'labs', 'projects' ];

  user: User;
  subject: Subject;

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
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

  changePage(val) {
    this.page = val;
    this.router.navigate(['teacher/subjects/' + this.subject.sifra + '/' + this.links[val - 1]]);
  }

  togglePageShow(page) {
    this.alertService.clear();

    switch (page)
    {
      case 'lab':
        this.subject.prikazi_lab = !this.subject.prikazi_lab;
        break;
      case 'ispit':
        this.subject.prikazi_ispit = !this.subject.prikazi_ispit;
        break;
      case 'projekat':
        this.subject.prikazi_projekat = !this.subject.prikazi_projekat;
        break;
    }

    this.subjectService.editSubject(this.subject)
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.success('Uspešno ste ažurirali prikaz stranica', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom ažuriranja prikazivanja stranica', {autoClose: true});
        }
      })
  }
}
