import { Component, OnInit } from '@angular/core';
import {Subject} from '../../models/subject';
import {WorkerService} from '../../services/worker.service';
import {SubjectService} from '../../services/subject.service';
import {Worker} from '../../models/worker';
import {AlertService} from '../../services/alert.service';
import {Schedule} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule.service';
import {first} from 'rxjs/operators';

class PredmetOdsek {
  predmet: Subject;
  odsek: string;
}

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.css']
})
export class ScheduleManagementComponent implements OnInit {

  predavanja = [];
  vezbe = [];

  mojPredmet = null;
  brp: number;
  brv: number;

  zaposleni: Array<Worker>;
  predmeti: Array<Subject>;
  predmetiOdseci: Array<PredmetOdsek> = [];

  grupa: number;
  tip: string;

  constructor(
    private workerService: WorkerService,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.predavanja = [];
    this.vezbe = [];
    this.predmetiOdseci = [];

    this.mojPredmet = null;
    this.brp = 0;
    this.brv = 0;

    this.subjectService.getAll().subscribe(s => {
      s.forEach(value => {
        value.odseci.forEach(ods => {
          let obj: PredmetOdsek = {
            predmet: value,
            odsek: ods.modul.toUpperCase()
          };

          this.predmetiOdseci.push(obj);
        })
      })
    });

    this.workerService.getAllWorkers().subscribe(w => {
      this.zaposleni = w.
      filter(value => value.title != 'istraživač' && value.title != 'laboratorijski inženjer' && value.title != 'laboratorijski tehničar')
    });

    // console.log(this.zaposleni);
    // console.log(this.predmetiOdseci);
  }

  chooseSchedule() {
    this.alertService.clear();

    let mySubject = this.predmetiOdseci[this.mojPredmet].predmet.sifra;

    this.scheduleService.getScheduleForSubject(mySubject)
      .pipe(first())
      .subscribe((value: Schedule[]) => {
        console.log(value);

        value = value.filter(v => v.odsek == this.predmetiOdseci[this.mojPredmet].odsek);
        let schedule: Schedule = value[0];

        console.log()

        if(schedule != null) {
          this.predavanja = schedule.predavanja;
          this.vezbe = schedule.vezbe;

          this.brp = schedule.predavanja.length;
          this.brv = schedule.vezbe.length;
        }
        else {
          this.predavanja = [];
          this.vezbe = [];

          this.brp = 0;
          this.brv = 0;
        }
      })
  }

  brP(event) {

    this.predavanja = [];
    this.brp = Number.parseInt(event.target.value);
    for(let i = 0; i < this.brp; i++) {
      let objP = {
        grupa: "P" + (i + 1),
        tip: 'p', //predavanja
        dan: '',
        pocetak: '',
        kraj: '',
        zaposleni: []
      }

      this.predavanja.push(objP);
    }
    console.log(this.predavanja);
  }

  brV(event) {
    if(this.vezbe.length == 0) {

      this.brv = Number.parseInt(event.target.value);
      for (let i = 0; i < this.brv; i++) {
        let objV = {
          grupa: '',
          tip: 'v', //vezbe
          dan: '',
          pocetak: '',
          kraj: '',
          zaposleni: []
        }

        objV.grupa = 'V' + (i + 1);
        this.vezbe.push(objV);
      }

    }
    console.log(this.vezbe);
  }

  izaberiGrupu(g, t) {
    this.grupa = g - 1;
    this.tip = t;
  }

  addTeacher(teacher) {
    if(this.tip == 'p') {
      if(this.predavanja[this.grupa].zaposleni.find(value => value == teacher) != undefined) {
        this.predavanja[this.grupa].zaposleni = this.predavanja[this.grupa].zaposleni.filter(value => value != teacher);
      }
      else {
        this.predavanja[this.grupa].zaposleni.push(teacher);
      }
    }
    else {
      if(this.vezbe[this.grupa].zaposleni.find(value => value == teacher) != undefined) {
        this.vezbe[this.grupa].zaposleni = this.vezbe[this.grupa].zaposleni.filter(value => value != teacher);
      }
      else {
        this.vezbe[this.grupa].zaposleni.push(teacher);
      }
    }

    console.log(this.predavanja);
    console.log(this.vezbe);
  }

  isAdded(teacher) {
    if(this.tip == 'p') {
      if(this.predavanja != [] && this.predavanja[this.grupa] == undefined) return;
      if(this.predavanja[this.grupa].zaposleni.find(value => value == teacher) != undefined) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if(this.vezbe != [] && this.vezbe[this.grupa] == undefined) return;
      if(this.vezbe[this.grupa].zaposleni.find(value => value == teacher) != undefined) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  submitSchedule() {
    this.alertService.clear();

    let dataError = false;
    let timeError = false;

    this.predavanja.forEach(value => {
      if(value.grupa == '' || value.tip == '' || value.dan == '' || value.pocetak == '' || value.kraj == '' || value.zaposleni.length == 0) {
        dataError = true;
      }

      if(value.pocetak > value.kraj) {
        timeError = true;
      }
    })

    this.vezbe.forEach(value => {
      if(value.grupa == '' || value.tip == '' || value.dan == '' || value.pocetak == '' || value.kraj == '' || value.zaposleni.length == 0) {
        dataError = true;
      }

      if(value.pocetak > value.kraj) {
        timeError = true;
      }
    })

    if(dataError) {
      this.alertService.error('Morate popuniti sva polja za sve izabrane grupe da biste mogli da nastavite');
    }
    if(timeError) {
      this.alertService.error('Uneli ste pogrešno vreme prilikom odabira početka i kraja termina');
    }
    if(timeError || dataError) {
      return;
    }

    let schedule: Schedule = {
      predmet: this.predmetiOdseci[this.mojPredmet].predmet.sifra,
      odsek: this.predmetiOdseci[this.mojPredmet].odsek,
      predavanja: this.predavanja,
      vezbe: this.vezbe
    };

    console.log(schedule);

    this.scheduleService.addSchedule(schedule)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Uspešno ste ažurirali plan angažovanja');
        },
        error: err => {
          this.alertService.error('Desila se greška prilikom ažuriranja podataka');
        }
      })
  }
}
