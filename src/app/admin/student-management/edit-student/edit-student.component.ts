import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../../services/student.service';
import {AlertService} from '../../../services/alert.service';
import {first} from 'rxjs/operators';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studiesType = [ 'Osnovne akademske studije', 'Master akademske studije', 'Doktorske studije' ];
  studentStatus = [ 'Aktivan', 'Neaktivan' ];

  myUser: string;

  firstname: string;
  lastname: string;
  username: string;
  password = '';
  index: string;
  type: string;
  status: string;
  oldPassword: string;

  submitted: boolean;

  @Input() usernameRegex: RegExp;
  @Input() indexRegex: RegExp;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.myUser = this.route.snapshot.params['username'];
    this.studentService.get(this.myUser)
      .pipe(first())
      .subscribe(user => {

        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        this.index = user.index;
        this.type = user.type;
        this.status = user.status;
        this.oldPassword = user.password;

        this.password = '';
      });
  }

  edit() {
    this.submitted = true;

    this.alertService.clear();

    let student;

    if(this.password == '') {
      student = {
        username: this.username,
        status: this.status,
        password: this.oldPassword
      }
    }
    else {
      student = {
        username: this.username,
        password: this.password,
        status: this.status
      }
    }

    this.studentService.update(student)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Podaci o studentu ' + this.firstname + ' ' + this.lastname + ' su uspešno izmenjeni', {autoClose: true}
          );

          this.password = '';
        },
        error: err => {
          this.alertService.error('ERROR');
        }
      });
  }
}
