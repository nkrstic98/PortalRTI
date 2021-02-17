import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import subject from '../../../../backend/src/model/subject';

@Component({
  selector: 'app-subject-about',
  templateUrl: './subject-about.component.html',
  styleUrls: ['./subject-about.component.css']
})
export class SubjectAboutComponent implements OnInit {
  subject: Subject;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    let s = this.route.snapshot.params['subject'];
    console.log(s);
    this.subjectService.getSubject(s)
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.subject = subject;
        console.log(this.subject);
      })
  }

}
