import { Component, OnInit } from '@angular/core';
import {List} from '../../models/list';
import {TeacherService} from '../../services/teacher.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';
import {WorkerService} from '../../services/worker.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.css']
})
export class ListManagementComponent implements OnInit {

  spisak: List;
  submitted: boolean;

  user: User;

  spiskovi: Array<List> = [];

  file: File = null;

  constructor(
    private workerService: WorkerService,
    private alerService: AlertService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.submitted = false;
    this.spisak = {
      naziv: '',
      termin: '',
      mesto_odrzavanja: '',
      prijavljeni: [],
      spisak_otvoren: true,
      rok_za_prijavu: '',
      fajlovi: false,
      limit: null,
      autor: this.user.username
    }

    this.workerService.getLists()
      .pipe(first())
      .subscribe((value: List[]) => {
        this.spiskovi = value;
        this.spiskovi.forEach(s => {
          if(s.limit != null) {
            if(s.limit == s.prijavljeni.length) {
              s.spisak_otvoren = false;
            }
          }
        })

        this.spiskovi.forEach(s => {
          let now = Date.now();
          let time = Date.parse(s.rok_za_prijavu);
          if(now > time) {
            s.spisak_otvoren = false;
          }
        })
      })
  }

  toggleCheck() {
    this.spisak.fajlovi = !this.spisak.fajlovi;
  }

  submitList() {
    this.submitted = true;

    if(this.spisak.naziv == '' || this.spisak.termin == '' || this.spisak.mesto_odrzavanja == '' || this.spisak.rok_za_prijavu == '') {
      return;
    }

    let termin = new Date(this.spisak.termin);
    let rok = new Date(this.spisak.rok_za_prijavu);
    let sada = new Date(Date.now());

    if(termin.getTime() < sada.getTime()) {
      this.alerService.error("Termin održavanja nije ispravan. Proverite unete podatke");
      return;
    }

    if(rok.getTime() < sada.getTime()) {
      this.alerService.error("Zadati rok za prijavu nije ispravan. Proverite unete podatke");
      return;
    }

    this.workerService.submitList(this.spisak)
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

  changeStatus(i) {
    this.spiskovi[i].spisak_otvoren = !this.spiskovi[i].spisak_otvoren;
    console.log(this.spiskovi[i]);
    this.workerService.updateList(this.spiskovi[i])
      .pipe(first())
      .subscribe({
          next: () => {
            this.alerService.success('Uspešno ste ažurirali stanje spiska', {autoClose: true});
          },
          error: err => {
            this.alerService.error('Desila se greška prilikom ažuriranja spiska. Molimo Vas pokušsajte ponovo');
          }
        }
      )
  }
  onFileSelected(event) {
    //console.log(event);
    this.file = <File>event.target.files[0];
  }

  signUp(s: List) {
    if(s.fajlovi && this.file == null) {
      this.alerService.error('Morate dodati fajl da biste se prijavili');
      return;
    }

    let existing = s.prijavljeni.find(value => value.student == this.user.username);

    if(existing == undefined) {
      if (s.fajlovi) {
        s.prijavljeni.push({student: this.user.username, fajl: this.file.name})
      } else {
        s.prijavljeni.push({student: this.user.username})
      }
    }
    else {
      if(s.fajlovi) {
        existing.fajl = this.file.name;
      }
      else {
        this.alerService.warn("Već ste se prijavili na ovu listu", {autoClose: true});
        return;
      }
    }

    let fd = new FormData();
    fd.append('spisak', JSON.stringify(s));
    fd.append('file', this.file);

    this.workerService.signUpToList(fd)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alerService.success('Uspešno ste se prijavili na spisak', {autoClose: true});
          this.ngOnInit()
        },
        error: err => {
          this.alerService.error('Desila se greška prilikom prijave. Molimo Vas pokušsajte ponovo');
        }
      })
  }
}
