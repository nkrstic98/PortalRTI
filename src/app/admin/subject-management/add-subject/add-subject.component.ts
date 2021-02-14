import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../services/subject.service';
import {AlertService} from '../../../services/alert.service';
import {first} from 'rxjs/operators';
import {Odsek} from '../../../models/subject';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  sifra = "";
  naziv = "";
  espb = "";

  tip_si = "";
  tip_rti = "";
  tip_oo = "";
  tip_m = "";

  semestar_si = "";
  semestar_rti = "";
  semestar_oo = "";
  semestar_m = "";

  modul: Odsek[];

  predavanja = "";
  vezbe = "";
  don = "";
  cilj = "";
  ishod = "";
  info_lab = "";
  info_polaganje = "";
  propozicije = "";

  submitted: Boolean;

  si: Boolean;
  rti: Boolean;
  oo: Boolean;
  m: Boolean;
  not_one_selected: Boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService
  ) {
    this.si = false;
    this.rti = false;
    this.oo = false;
    this.m = false;
    this.modul = [];
    this.not_one_selected = false;
  }

  ngOnInit(): void {
  }

  addSubject() {
    this.submitted = true;

    this.alertService.clear();

    if(!this.si && !this.rti && !this.oo && !this.m) {
      console.log("Not one selected");
      this.not_one_selected = true;
      console.log(this.not_one_selected)
      return;
    }

    if(this.si && (this.tip_si =="" || this.semestar_si == "")) {
      return;
    }
    else {
      if(this.si) {
        this.modul.push({
          modul: "si",
          tip: this.tip_si,
          semestar: Number(this.semestar_si)
        })
      }
    }

    console.log(this.modul);

    if(this.rti && (this.tip_rti =="" || this.semestar_rti == "")) {
      return;
    }
    else {
      if(this.rti) {
        this.modul.push({
          modul: "rti",
          tip: this.tip_rti,
          semestar: Number(this.semestar_rti)
        })
      }
    }

    console.log(this.modul);

    if(this.oo && (this.tip_oo == "" || this.semestar_oo == "")) {
      return;
    }
    else {
      if(this.oo) {
        this.modul.push({
          modul: "oo",
          tip: this.tip_oo,
          semestar: Number(this.semestar_oo)
        })
      }
    }

    console.log(this.modul);

    if(this.m && (this.tip_m =="" || this.semestar_m == "")) {
      return;
    }
    else {
      if(this.m) {
        this.modul.push({
          modul: "m",
          tip: this.tip_m,
          semestar: Number(this.semestar_m)
        })
      }
    }

    console.log(this.modul);

    if(this.sifra == "" || this.naziv == "" || this.espb == "" || this.modul.length == 0 || this.predavanja == "" ||
      this.vezbe == "" || this.don == "") {
      console.log("Usao sam u poslednji if, shit");
      return;
    }

    let subject = {
      sifra: this.sifra,
      naziv: this.naziv,
      espb: this.espb,
      odseci: this.modul,
      predavanja: this.predavanja,
      vezbe: this.vezbe,
      don: this.don,
      cilj: this.cilj,
      ishod: this.ishod,
      info_lab: this.info_lab,
      info_polaganje: this.info_polaganje,
      propozicije: this.propozicije
    }

    this.subjectService.addSubject(subject)
      .pipe(first())
      .subscribe({
        next: subject => {
          if(subject) {
            this.alertService.error(
              "Postoji predmet sa unetom šifrom. Proverite ponovo unete podatke"
            )
          }
          else {
            this.alertService.success(
              "Uspešno ste dodali novi predmet", {keepAfterRouteChange: true, autoClose: true}
            )

            this.router.navigate(['../'], {relativeTo: this.route});
          }
        },
        error: err => {
          this.alertService.error(err.message);
        }
      })
  }

  checked(odsek) {
    switch(odsek) {
      case "si" :
        this.si = !this.si;
        break;

      case "rti" :
        this.rti = !this.rti;
        break;

      case "oo" :
        this.oo = !this.oo;
        break;

      case "m" :
        this.m = !this.m;
        break;
    }
  }


}
