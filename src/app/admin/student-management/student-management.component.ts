import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {first} from 'rxjs/operators';

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

  constructor(private studentService: StudentService) { }

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

  }
}
