import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';

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

  semestri = [ "I Semestar", "II Semestar", "III Semestar", "IV Semestar", "V Semestar", "VI Semestar", "VII Semestar", "VIII Semestar" ];
  masterSemestri = [ "I Semestar", "II Semestar" ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService
  ) {
    router.events.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.modul = this.route.snapshot.params['studies_type'];
    console.log(this.modul)
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

}
