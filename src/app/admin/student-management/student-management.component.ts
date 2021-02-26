import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {first} from 'rxjs/operators';

import * as XLSX from "xlsx";
import {AccountService} from '../../services/account.service';
import {AlertService} from '../../services/alert.service';
import {Student} from '../../models/student';

class StudentData {
  korime: string;
  lozinka: string;
  ime: string;
  prezime: string;
}

type AOA = StudentData[];

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  students = null;

  sortCriteria = "";

  type = null;
  active = false;

  uploadedData: AOA = [];

  error = "";

  constructor(
    private studentService: StudentService,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudents()
      .pipe(first())
      .subscribe(students => this.students = students);
  }

  sort(criteria) {
    this.sortCriteria = criteria.target.value;

    if(this.sortCriteria == "1") {
      this.students.sort((a, b) => a.index.localeCompare(b.index));
    }

    if(this.sortCriteria == "2") {
      this.students.sort((a, b) => a.lastname.localeCompare(b.lastname));
    }
  }

  getByStudies(studiesCriteria) {
    this.type = studiesCriteria.target.value;
    this.filter();
  }

  showActiveOnly() {
    this.active = !this.active;
    this.filter();
  }

  filter() {
    this.studentService.filter(this.type, this.active)
      .pipe(first())
      .subscribe(students => this.students = students);
  }

  reset() {
    this.active = false;
    this.type = null;
    this.sortCriteria = "";

    this.ngOnInit();
  }

  delete(student) {
    this.studentService.delete(student)
      .pipe(first())
      .subscribe(
        () => this.students = this.students.filter(x => x.username != student)
      );
  }

  //---------------------------------------------------------------------------------
  //XLS i CSV ucitavanje studenata

  onFileChange(event) {
    if(event.target.files.length != 1) {
      this.error = "Moguće je uploadovati najviše 1 fajl";
      return;
    }
    else {
      this.error = "";
    }

    let ext = event.target.files[0].name.split('.').pop();

    switch(ext)
    {
      case "xlsx":
        this.uploadXLSX(event);
        break;

      default:
        this.error = "Niste učitali odgovarajući tip fajla";
        return;
    }
  }

  /**
   * Koristimo prethodno instaliranu XLSX biblioteku
   * da iz fajla iscitamo vrednosti
   *
   * event -> parametar koji se prima kada se desi upload
   * */
  uploadXLSX(event) {
    //pokreni FileReader
    let target: DataTransfer = <DataTransfer> event.target;
    let reader: FileReader = new FileReader();

    reader.onload = (e: any) => {

      //iscitaj workbook
      let bstr: string = e.target.result;
      let wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      //dohvati prvi sheet
      let wsname: string = wb.SheetNames[0];
      let ws: XLSX.WorkSheet = wb.Sheets[wsname];

      //sacuvaj podatke
      this.uploadedData = <AOA>XLSX.utils.sheet_to_json(ws, { header : 0 });
      console.log(this.uploadedData);
    }
    reader.readAsBinaryString(target.files[0]);
  }

  registerStudents() {
    let iteration = 0;
    if(this.uploadedData.length != 0) {
      this.alertService.warn("Studenti se učitavaju u bazu. Molim Vas sačekajte...", {autoClose: true});
      this.uploadedData.forEach(value => {
        let index = "20" + value.korime.substr(2, 2) + "/";
        index += value.korime.substr(4, 4);

        let tipStudija = "";
        switch (value.korime[8])
        {
          case "d":
            tipStudija = "Osnovne akademske studije";
            break;

          case "m":
            tipStudija = "Master akademske studije";
            break;

          case "p":
            tipStudija = "Doktorske studije";
            break;
        }

        let student: Student = {
          username: value.korime,
          password: value.lozinka,
          index: index,
          type: tipStudija,
          firstname: value.ime,
          lastname: value.prezime,
          status: "Aktivan",
          subjects: []
        }

        this.accountService.registerStudent(student)
          .pipe(first())
          .subscribe({
            next: () => {
              iteration++;
              if (iteration == this.uploadedData.length) {
                this.alertService.clear();
                this.alertService.success("Studenti su uspešno registrovani", {autoClose:true});
                this.ngOnInit();
              }
            },
            error: err => {
              this.alertService.clear();
              this.alertService.error("Desila se greška prilikom registracije studenata");
              this.ngOnInit();
            }
          })
      })
    }
  }
}
