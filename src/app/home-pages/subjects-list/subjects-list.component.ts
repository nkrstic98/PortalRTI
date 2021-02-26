import { Component, OnInit } from '@angular/core';
import {StudentRequest, Subject} from '../../models/subject';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {User} from '../../models/user';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit {
  subjects: Subject[];
  filteredSubjects: Subject[];
  selected = new FormControl(0);
  modul = "";

  student: Student;
  user: User;

  semestri = [ "I Semestar", "II Semestar", "III Semestar", "IV Semestar", "V Semestar", "VI Semestar", "VII Semestar", "VIII Semestar" ];
  masterSemestri = [ "I Semestar", "II Semestar" ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private alertService: AlertService
  ) {
    router.events.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.modul = this.route.snapshot.params['studies_type'];

    this.user = JSON.parse(localStorage.getItem('user'));

    if(this.user != null) {
      this.studentService.get(this.user.username)
        .pipe(first())
        .subscribe(student => {
          this.student = student;
        })
    }

    this.subjectService.getAll()
      .pipe(first())
      .subscribe(subjects => {
        this.subjects = subjects.filter(value => value.odseci.find(value => value.modul == this.modul));
        this.filteredSubjects = this.subjects.filter(value => value.odseci.find(value => value.semestar == 1));
      })

    this.selected.setValue(0);
  }

  getBySemester(semestar) {
    this.filteredSubjects = this.subjects.filter(value => value.odseci.find(value => value.semestar == semestar + 1));
    this.selected.setValue(semestar);
  }

  mySubject(sifra): boolean {
    if(this.student.subjects.find(value => value == sifra) != undefined) {
      return true;
    }
    return false;
  }

  signup(sifra, naziv) {
    let request: StudentRequest = {
      subject: sifra,
      student: this.user.username
    }

    this.subjectService.studentSignup(request)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Uspešno ste se poslali prijavu za predmet " + naziv, {autoClose: true});
        },
        error: err => {
          this.alertService.error(
              "Desila se greška prilikom prijave na predmet " + naziv + ". Pokušsajte ponovo!",
              {autoClose: true}
            );
        }
      })
  }

}
