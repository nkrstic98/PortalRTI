import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Subject} from '../models/subject';
import {TeacherService} from '../services/teacher.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {SubjectService} from '../services/subject.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  page: Number;
  links = [ 'notifications', 'edit_about', 'lectures', 'exercises', 'exams', 'labs', 'projects' ];
  links_student = [ 'notifications', 'about', 'lectures', 'exercises', 'exams', 'labs', 'projects' ];

  user: User;
  subject: Subject;

  subscription: Subscription;

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.teacherService.subject.subscribe(value => this.subject = value);
    //Kada se promeni ruta, vracamo se na prvu stranu predmeta
    //Uvek se na pocetku prikazuje informacija sa obavestenjima
    this.router.events.subscribe(() => {
      this.page = JSON.parse(localStorage.getItem('page'));
    })
  }

  ngOnInit(): void {
    this.page = JSON.parse(localStorage.getItem('page'));
    console.log(this.page);

    // this.teacherService.getSubject(localStorage.getItem('subject'));

    this.user = JSON.parse(localStorage.getItem('user'));

    // this.teacherService.subject.subscribe(subject => {
    //   this.subject = subject;
    //   // localStorage.setItem('subject', JSON.stringify(this.subject));
    //   // console.log(this.subject);
    //   if(this.page == null) {
    //     if(this.user.type == 2) {
    //       this.page = 1;
    //       localStorage.setItem('page', JSON.stringify(this.page));
    //       // this.changePage(0);
    //     }
    //     else {
    //       this.page = 2;
    //       localStorage.setItem('page', JSON.stringify(this.page));
    //       // this.changePage(1);
    //     }
    //   }
    // });

    if(this.page == null) {
      if(this.user.type == 2) {
        this.page = 1;
        localStorage.setItem('page', JSON.stringify(this.page));
        // this.changePage(0);
      }
      else {
        this.page = 2;
        localStorage.setItem('page', JSON.stringify(this.page));
        // this.changePage(1);
      }
    }
  }

  ngOnDestroy() {
    // localStorage.removeItem('page');
    // localStorage.removeItem('subject');
  }

  changePage(val) {
    this.page = val;
    if(this.user.type == 1) {
      localStorage.setItem('page', JSON.stringify(val));
      this.router.navigate(['teacher/subjects/' + this.subject.sifra + '/' + this.links[val - 1]]);
    }
    else {
      localStorage.setItem('page', JSON.stringify(val));
      this.router.navigate(['subjects/' + this.subject.sifra + '/' + this.links_student[val - 1]]);
    }
  }

  togglePageShow(page) {
    this.alertService.clear();
    // this.ngOnInit();

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
        next: (value:Subject) => {
          this.alertService.success('Uspešno ste ažurirali prikaz stranica', {autoClose: true});
          // this.ngOnInit();
          this.teacherService.setSubject(this.subject);
        },
        error: err => {
          this.alertService.error('Greška prilikom ažuriranja prikazivanja stranica', {autoClose: true});
        }
      })
  }
}
