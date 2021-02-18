import { Component, OnInit } from '@angular/core';
import {FileInfo, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {AlertService} from '../../services/alert.service';
import {WorkerService} from '../../services/worker.service';
import {first} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';
import {TextEditorService} from '../../services/text-editor.service';

@Component({
  selector: 'app-subject-lab',
  templateUrl: './subject-lab.component.html',
  styleUrls: ['./subject-lab.component.css']
})
export class SubjectLabComponent implements OnInit {

  filesToUpload: Array<File> = [];

  subject: Subject;

  user: User;

  authorName: string;

  subscription: Subscription;

  labInfo : string;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private alertService: AlertService,
    private workerService: WorkerService,
    private textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
    this.subscription = this.textEditorService.text.subscribe(text => {
      this.labInfo = text;
      console.log("Apdejtovan tekst: " + this.labInfo);
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
        this.textEditorService.changeText(subject.info_lab);
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

    formData.append('dir', 'lab');

    formData.append('subject', this.route.snapshot.params['sifra']);
    formData.append('destination_array', 'fajlovi_lab');
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

    this.subjectService.deleteDocument(file, this.route.snapshot.params['sifra'], 'lab', 'fajlovi_lab')
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

    this.subjectService.reorderDocuments(this.subject.fajlovi_lab, this.route.snapshot.params['sifra'], 'fajlovi_lab')
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

  saveLabInfo() {
    this.subject.info_lab = this.labInfo;
    this.subjectService.editSubject(this.subject)
      .pipe(first())
      .subscribe({
        next: value => {
          this.alertService.warn('Uspešno ste ažurirali informacije o laboratorijskim vežbama', {autoClose: true});
          this.ngOnInit();
        },
        error: err => {
          this.alertService.error('Greška prilikom ažuriranja informacija. Pokušsajte ponovo!', {autoClose: true});
        }
      })
  }
}
