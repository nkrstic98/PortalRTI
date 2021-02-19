import { Component, OnInit } from '@angular/core';
import {Information, Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {TeacherService} from '../../services/teacher.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-subject-information',
  templateUrl: './subject-information.component.html',
  styleUrls: ['./subject-information.component.css']
})
export class SubjectInformationComponent implements OnInit {

  subjectInfo: Information[] = [];
  subject: string;

  constructor(
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherService.subject.subscribe(val => {
      this.subject = val.sifra;
      console.log(val.obavestenja);
      this.subjectInfo = val.obavestenja.sort((a, b) => {
        let aDate = new Date(a.datum);
        let bDate = new Date(b.datum);

        return aDate.toLocaleDateString().localeCompare(bDate.toLocaleDateString());
      })
    });
  }

  getDate(date): string {
    let newDate = date.split('-');
    return newDate[2] + '.' + newDate[1] + '.' + newDate[0] + '.';
  }

  paint(date) {
    let myDate = new Date(date);
    let compareDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    return myDate.getTime() > compareDate.getTime();
  }
}
