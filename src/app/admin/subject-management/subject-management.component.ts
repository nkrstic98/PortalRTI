import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {StudentRequest, Subject} from '../../models/subject';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import student from '../../../../backend/src/model/student';

@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})
export class SubjectManagementComponent implements OnInit {
  module: string;
  semester: Number;

  subjects: Subject[];
  filteredSubjects: Subject[];

  students: Student[];
  enrolledStudents: string[];

  studentRequests: StudentRequest[] = [];

  enrollSubject = "";

  constructor(
    private router: Router,
    private alertService: AlertService,
    private subjectService: SubjectService,
    private studentService: StudentService
  ) {
    this.module = "";
    this.semester = null;
    this.enrolledStudents = [];
  }

  ngOnInit(): void {
    this.subjectService.getAll()
      .pipe(first())
      .subscribe(subjects => {
        this.subjects = subjects.sort((a, b) => a.sifra.localeCompare(b.sifra));
        this.filteredSubjects = this.subjects;
      })

    this.studentService.getAllStudents()
      .pipe(first())
      .subscribe(students => {
        this.students = students
          .sort((a, b) => a.index.localeCompare(b.index));
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

  delete(subject) {
    this.subjectService.delete(subject)
      .pipe(first())
      .subscribe(
        () => {
          this.subjects = this.subjects
            .filter(x => x.sifra != subject)
            .sort((a, b) => a.sifra.localeCompare(b.sifra))
          this.filteredSubjects = this.subjects
        }
      );
  }

  //-----------------------------------------------------------------------------------------

  chooseSubject(sifra) {
    this.enrolledStudents = [];
    this.enrollSubject = sifra;
    this.studentRequests = this.subjects.find(value => value.sifra == sifra).prijave_studenata;
  }

  // addStudent(index) {
  //   if(this.enrolledStudents.find(value => value == index) != undefined) {
  //     this.enrolledStudents = this.enrolledStudents.filter(value => value != index);
  //     console.log(this.enrolledStudents);
  //   }
  //   else {
  //     this.enrolledStudents.push(index);
  //     console.log(this.enrolledStudents);
  //   }
  // }

  cancelEnroll() {
    this.enrolledStudents = [];
    console.log(this.enrolledStudents);
  }

  getStudentInfo(student): string {
    let st = this.students.find(value => value.username == student);

    if(st != undefined) {
      return st.index + " - " + st.lastname + " " + st.firstname;
    }
    else return "";
  }

  // isAdded(index): Boolean {
  //   if(this.enrolledStudents.find(value => value == index) != undefined) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  //
  // alreadyEnrolled(s: Student): boolean {
  //
  //   for(let i = 0; i < s.subjects.length; i++) {
  //     if(s.subjects[i] == this.enrollSubject) {
  //       return true;
  //     }
  //   }
  //
  //   return false;
  // }

  enrollStudents(st) {
    let student = this.students.find(value => value.username == st)
    console.log(student);
    student.subjects.push(this.enrollSubject);
    this.studentService.update(student)
      .pipe(first())
      .subscribe(value => {
        console.log("Uspesan apdejt");
        this.removeRequest(st);
      })

    // this.alertService.success("Uspešno ste ažurirali listu studenata", {autoClose: true});
  }

  removeRequest(st) {
    let stReq = this.studentRequests.find(req => req.student == st && req.subject == this.enrollSubject);
    this.subjectService.removeStudentRequest(stReq)
      .pipe(first())
      .subscribe(() => {
        this.studentRequests = this.studentRequests.filter(req => req.student != st && req.subject != this.enrollSubject);
      })
  }

  removeAllStudents() {
    this.students.forEach(student => {
      student.subjects = student.subjects.filter(subject => subject != this.enrollSubject);
      console.log(student);
      this.studentService.removeSubject(student.username, this.enrollSubject)
        .pipe(first())
        .subscribe()
    })

    this.alertService.warn("Uspešno ste uklonili sve studente sa predmeta", {autoClose: true});
  }
}
