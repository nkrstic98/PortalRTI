import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})
export class SubjectManagementComponent implements OnInit {
  module: String;
  semester: Number;

  subjects: Subject[];
  filteredSubjects: Subject[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private subjectService: SubjectService
  ) {
    this.module = "";
    this.semester = null;
  }

  ngOnInit(): void {
    this.subjectService.getAll()
      .pipe(first())
      .subscribe(subjects => {
        this.subjects = subjects;
        this.filteredSubjects = subjects;
      })
  }

  getByModule(event) {
    this.filteredSubjects = this.subjects.filter(value => value.odseci.find(element => element.modul == event.target.value));
  }

  getBySemester(event) {
    this.filteredSubjects = this.subjects.filter(value => value.odseci.find(el => el.semestar == event.target.value));
  }

  reset() {
    this.filteredSubjects = this.subjects;
    this.module = "";
    this.semester = null;
  }
}
