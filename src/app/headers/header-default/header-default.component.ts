import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AccountService} from '../../services/account.service';
import {SubjectService} from '../../services/subject.service';
import {StudentService} from '../../services/student.service';
import {Subject} from '../../models/subject';
import {first} from 'rxjs/operators';
import {TeacherService} from '../../services/teacher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.css']
})
export class HeaderDefaultComponent implements OnInit {

  user: User;
  mySubjects: Subject[] = [];

  links_student = [ 'notifications', 'about', 'lectures', 'exercises', 'exams', 'labs', 'projects' ];

  constructor(
    private accountService: AccountService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe(user => this.user = user);

    if(this.user != null) {
      this.studentService.get(this.user.username)
        .pipe(first())
        .subscribe(st => {
          st.subjects.forEach(sub => {
            this.subjectService.getSubject(sub)
              .pipe(first())
              .subscribe((val: Subject) => {
                this.mySubjects.push(val);
              })
          })
        })
    }
  }

  goToSubject(sifra) {
    this.teacherService.getSubject(sifra);
    localStorage.setItem('subject', sifra);
    localStorage.setItem('page', JSON.stringify(1));
    this.router.navigate(['subjects/' + sifra + '/notifications']);
  }
}
