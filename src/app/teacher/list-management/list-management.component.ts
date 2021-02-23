import { Component, OnInit } from '@angular/core';
import {List} from '../../models/list';
import {TeacherService} from '../../services/teacher.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.css']
})
export class ListManagementComponent implements OnInit {

  spisak: List;
  submitted: boolean;

  constructor(
    private teacherService: TeacherService,
    private alerService: AlertService
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    this.spisak = {
      naziv: '',
      termin: '',
      mesto_odrzavanja: '',
      prijavljeni: [],
      spisak_otvoren: true,
      rok_za_prijavu: '',
      fajlovi: false
    }
  }

  toggleCheck() {
    this.spisak.fajlovi = !this.spisak.fajlovi;
  }

  submitList() {
    this.submitted = true;

    if(this.spisak.naziv == '' || this.spisak.termin == '' || this.spisak.mesto_odrzavanja == '' || this.spisak.rok_za_prijavu == '') {
      return;
    }

    this.teacherService.submitList(this.spisak)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alerService.success('Uspešno ste otvorili novi spisak', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alerService.error('Desila se greška prilikom otvaranja spiska. Molimo Vas pokušsajte ponovo');
        }
        }
      )
  }

}
