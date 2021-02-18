import { Component, OnInit } from '@angular/core';
import {Information, Subject} from '../../models/subject';
import {Subscription} from 'rxjs';
import {SubjectService} from '../../services/subject.service';
import {TextEditorService} from '../../services/text-editor.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  info: Information = {
    naslov: "",
    tekst: "",
    datum: null,
    fajlovi: [],
    autor: JSON.parse(localStorage.getItem('user')).username
  }

  filesToUpload: Array<File> = [];
  subjects: Subject[];

  subjectArray = [];

  subscription: Subscription;

  submitted: boolean;

  uploadError: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private textEditorService: TextEditorService,
    private alertService: AlertService
  ) {
    this.subscription = this.textEditorService.text.subscribe(value => this.info.tekst = value);
  }

  ngOnInit(): void {
    this.subjectService.getAll()
      .pipe(first())
      .subscribe(value => {
        this.subjects = value;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fileChangeEvent(event) {
    this.filesToUpload = <Array<File>> event.target.files;
  }

  upload() {
    this.submitted = true;

    this.alertService.clear();

    let formData = new FormData();
    let files: Array<File> = this.filesToUpload;

    for(let i = 0; i < files.length; i++) {
      this.info.fajlovi[i] = files[i].name;
      formData.append('uploads[]', files[i], files[i]['name']);
    }

    formData.append('dir', 'notifications');

    this.subjectArray.forEach(value => {
      formData.delete('subject');
      formData.append('subject', value);

      this.subjectService.uploadNotificationFiles(formData)
        .pipe(first())
        .subscribe({
          next: () => {},
          error: () => {
            this.uploadError = true;
            this.alertService.error('Greška prilikom upload-a dokumenata', {autoClose: true});
          }
        })

      this.subjectService.getSubject(value)
        .pipe(first())
        .subscribe((s: Subject) => {
          let subject: Subject;

          subject = s;
          subject.obavestenja.push(this.info);

          this.subjectService.editSubject(subject)
            .pipe(first())
            .subscribe({
              next: () => {},
              error: () => {
                this.uploadError = true;
                this.alertService.error('Desila se greška prilikom ažuriranja predmeta ' + value, {autoClose: true});
              }
            })

        });
    })

    if(!this.uploadError) {
      this.alertService.success('Uspešno ste dodali vest!', {autoClose: true});
    }
  }
}
