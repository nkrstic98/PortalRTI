import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import subject from '../../../../backend/src/model/subject';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-subject-about',
  templateUrl: './subject-about.component.html',
  styleUrls: ['./subject-about.component.css']
})
export class SubjectAboutComponent implements OnInit {
  semestri = [ "I Semestar", "II Semestar", "III Semestar", "IV Semestar", "V Semestar", "VI Semestar", "VII Semestar", "VII Semestar" ];

  subject: Subject;


  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.teacherService.subject.subscribe(val => this.subject = val);
  }

}
