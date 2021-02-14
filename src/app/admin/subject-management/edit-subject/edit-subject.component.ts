import { Component, OnInit } from '@angular/core';
import {Subject} from '../../../models/subject';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../services/subject.service';
import {AlertService} from '../../../services/alert.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  subject: Subject;
  subjectId: String;

  submitted: Boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.params['sifra'];
    this.subjectService.getSubject(this.subjectId)
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.subject = subject;
      })
  }

  editSubject() {
    this.submitted = true;

    this.alertService.clear();

    if(this.subject.predavanja == null || this.subject.vezbe == null || this.subject.don == null) {
      return;
    }

    this.subjectService.editSubject(this.subject)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            "Podaci o predmetu su uspešno izmenjeni", {autoClose: true}
          );
        },
        error: err => {
          this.alertService.error('ERROR');
        }
      })
  }

}
