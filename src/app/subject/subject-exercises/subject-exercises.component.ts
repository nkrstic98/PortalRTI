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
  selector: 'app-subject-exercises',
  templateUrl: './subject-exercises.component.html',
  styleUrls: ['./subject-exercises.component.css']
})
export class SubjectExercisesComponent implements OnInit {

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
        this.dbFiles = subject.fajlovi_vezbe;
      })
  }

  fileChangeEvent(event) {
    this.filesToUpload = <Array<File>> event.target.files;
  }

  upload() {
    let formData = new FormData();
    let files: Array<File> = this.filesToUpload;

    for(let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
      // console.log("form data variable " + formData.getAll('uploads[]'));
    }

    formData.append('dir', 'exercises');

    formData.append('subject', this.route.snapshot.params['sifra']);
    formData.append('destination_array', 'fajlovi_vezbe');
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
    this.subjectService.deleteDocument(file, this.route.snapshot.params['sifra'], 'exercises', 'fajlovi_vezbe')
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
    this.subjectService.reorderDocuments(this.dbFiles, this.route.snapshot.params['sifra'], 'fajlovi_vezbe')
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
