import { Component, OnInit } from '@angular/core';
import {FileInfo, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {AlertService} from '../../services/alert.service';
import {WorkerService} from '../../services/worker.service';
import {TextEditorService} from '../../services/text-editor.service';
import {first} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-subject-project',
  templateUrl: './subject-project.component.html',
  styleUrls: ['./subject-project.component.css']
})
export class SubjectProjectComponent implements OnInit {

  filesToUpload: Array<File> = [];

  subject: Subject;

  user: User;

  authorName: string;

  subscription: Subscription;

  projectInfo : string;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private workerService: WorkerService,
    private textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
    this.subscription = this.textEditorService.text.subscribe(text => {
      this.projectInfo = text;
      // console.log("Apdejtovan tekst: " + this.labInfo);
    });

    this.user = JSON.parse(localStorage.getItem('user'));

    this.workerService.get(this.user.username)
      .pipe(first())
      .subscribe(worker => {
        this.authorName = worker.firstname + " " + worker.lastname;
      })

    this.subjectService.getSubject(this.route.snapshot.params['sifra'])
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.subject = subject;
        this.textEditorService.changeText(subject.info_projekat);
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    formData.append('dir', 'projects');

    formData.append('subject', this.route.snapshot.params['sifra']);
    formData.append('destination_array', 'fajlovi_projekat');
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

    this.subjectService.deleteDocument(file, this.route.snapshot.params['sifra'], 'projects', 'fajlovi_projekat')
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
    moveItemInArray(this.subject.fajlovi_lab, event.previousIndex, event.currentIndex);
    console.log(this.subject.fajlovi_lab);
  }

  changeFileOrder() {
    this.alertService.clear();

    this.subjectService.reorderDocuments(this.subject.fajlovi_lab, this.route.snapshot.params['sifra'], 'fajlovi_projekat')
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

  saveProjectInfo() {
    this.subject.info_projekat = this.projectInfo;
    this.subjectService.editSubject(this.subject)
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.success('Uspešno ste ažurirali informacije o projektima', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom ažuriranja informacija. Pokušajte ponovo!', {autoClose: true});
        }
      })
  }

}
