import { Component, OnInit } from '@angular/core';
import {FileInfo, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {AlertService} from '../../services/alert.service';
import {WorkerService} from '../../services/worker.service';
import {first} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-subject-exams',
  templateUrl: './subject-exams.component.html',
  styleUrls: ['./subject-exams.component.css']
})
export class SubjectExamsComponent implements OnInit {
  user: User;
  authorName: string;

  filesToUpload: Array<File> = [];

  dbFiles : Array<FileInfo> = [];
  subject: string;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.workerService.get(this.user.username)
      .pipe(first())
      .subscribe(worker => {
        this.authorName = worker.firstname + " " + worker.lastname;
      })

    this.subjectService.getSubject(this.route.snapshot.params['sifra'])
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.dbFiles = subject.fajlovi_ispit;
        this.subject = subject.sifra;
      })
  }

  fileChangeEvent(event) {
    this.filesToUpload = <Array<File>> event.target.files;
  }

  upload() {
    this.alertService.clear();

    let formData = new FormData();
    let files: Array<File> = this.filesToUpload;

    for(let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
      // console.log("form data variable " + formData.getAll('uploads[]'));
    }

    formData.append('dir', 'exams');

    formData.append('subject', this.route.snapshot.params['sifra']);
    formData.append('destination_array', 'fajlovi_ispit');
    formData.append('teacher', this.user.username);
    formData.append('authorName', this.authorName);

    this.subjectService.uploadDocuments(formData)
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.success('Uspešno ste dodali dokumente', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom upload-a dokumenata', {autoClose: true});
        }
      })
  }

  delete(file) {
    this.alertService.clear();

    this.subjectService.deleteDocument(file, this.route.snapshot.params['sifra'], 'exams', 'fajlovi_ispit')
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.warn('Uspešno ste obrisali dokument', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom brisanja dokumenata', {autoClose: true});
        }
      })
  }

  drop(event: CdkDragDrop<FileInfo[]>) {
    moveItemInArray(this.dbFiles, event.previousIndex, event.currentIndex);
    console.log(this.dbFiles);
  }

  changeFileOrder() {
    this.alertService.clear();

    this.subjectService.reorderDocuments(this.dbFiles, this.route.snapshot.params['sifra'], 'fajlovi_ispit')
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.warn('Uspešno ste ažurirali prikaz fajlova', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom organizovanja fajlova', {autoClose: true});
        }
      })
  }
}
