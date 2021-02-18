import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';
import subject from '../../../../backend/src/model/subject';
import {FileInfo, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {WorkerService} from '../../services/worker.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-subject-lectures',
  templateUrl: './subject-lectures.component.html',
  styleUrls: ['./subject-lectures.component.css']
})
export class SubjectLecturesComponent implements OnInit {

  filesToUpload: Array<File> = [];

  dbFiles : Array<FileInfo> = [];

  user: User;

  authorName: string;

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
        this.dbFiles = subject.fajlovi_predavanja;
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

    formData.append('dir', 'lectures');

    formData.append('subject', this.route.snapshot.params['sifra']);
    formData.append('destination_array', 'fajlovi_predavanja');
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

    this.subjectService.deleteDocument(file, this.route.snapshot.params['sifra'], 'lectures', 'fajlovi_predavanja')
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

    this.subjectService.reorderDocuments(this.dbFiles, this.route.snapshot.params['sifra'], 'fajlovi_predavanja')
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
