import { Component, OnInit } from '@angular/core';
import {Information, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TextEditorService} from '../../services/text-editor.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  filesToUpload: Array<File> = [];

  page = 0;
  nextE = true;
  prevE = false;

  newText = '';

  subjectInfo : Array<{
    subject: string;
    info: Information;
  }>;

  filteredInfo: Array<{
    subject: string;
    info: Information;
  }>;

  mySubjects: Subject[];

  user: User;

  submitted: boolean = false;

  subscription: Subscription;

  constructor(
    private subjectService: SubjectService,
    private textEditorService: TextEditorService,
    private alertService: AlertService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subscription = this.textEditorService.text.subscribe(value => this.newText = value);
  }

  ngOnInit(): void {
    this.subjectInfo = [];

    this.subjectService.getAll()
      .pipe(first())
      .subscribe(subjects => {
        this.mySubjects = subjects;

        let info;

        subjects.forEach(subject => {
          if (subject.obavestenja.length != 0) {

            let subInfo = subject.obavestenja.filter(o => o.autor == this.user.username);

            subInfo.forEach(i => {
              info = {
                subject: subject.sifra,
                info: i
              }

              this.subjectInfo.push(info);
            })
          }
        })

        this.filteredInfo = this.subjectInfo;

        this.textEditorService.changeText(this.filteredInfo[0].info.tekst);
      })

  }

  fileChangeEvent(event) {
    this.filesToUpload = <Array<File>> event.target.files;
  }

  edit() {
    this.subjectService.getSubject(this.filteredInfo[this.page].subject)
      .pipe(first())
      .subscribe((subject: Subject) => {
        this.filteredInfo[this.page].info.tekst = this.newText;

        if(this.filesToUpload.length != 0) {
          for(let i = 0; i < this.filteredInfo[this.page].info.fajlovi.length; i++) {
            this.subjectService.deleteNotificationFile(this.filteredInfo[this.page].subject, this.filteredInfo[this.page].info.fajlovi[i])
              .pipe(first())
              .subscribe()
          }

          this.filteredInfo[this.page].info.fajlovi = [];

          let formData = new FormData();
          let files: Array<File> = this.filesToUpload;

          for(let i = 0; i < files.length; i++) {
            this.filteredInfo[this.page].info.fajlovi[i] = files[i].name;
            formData.append('uploads[]', files[i], files[i]['name']);
          }

          formData.append('dir', 'notifications');
          formData.append('subject', this.filteredInfo[this.page].subject);

          this.subjectService.uploadNotificationFiles(formData)
            .pipe(first())
            .subscribe({
              next: () => {},
              error: () => {
                this.alertService.error('Greška prilikom upload-a dokumenata', {autoClose: true});
              }
            })
        }

        subject.obavestenja = subject.obavestenja.filter(o => o.id != this.filteredInfo[this.page].info.id)
        subject.obavestenja.push(this.filteredInfo[this.page].info);

        this.subjectService.editSubject(subject)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Uspešno ste ažurirali vest!', {autoClose: true});
            },
            error: () => {
              this.alertService.error('Greška prilikom upload-a dokumenata', {autoClose: true});
            }
          })
      })
  }

  chooseSubject(event) {
    this.filteredInfo = this.subjectInfo.filter(value => value.subject == event.target.value);
    this.page = 0;
    this.prevE = false;
    if (this.filteredInfo.length > 1) {
      this.nextE = true;
    }
    else {
      this.nextE = false;
    }
  }

  nextPage() {
    if(this.page == this.subjectInfo.length - 1) {
      this.nextE = false;
    }
    else {
      this.page++;
      if(this.page == this.subjectInfo.length - 1) {
        this.nextE = false;
      }
    }

    this.prevE = true;

    this.textEditorService.changeText(this.filteredInfo[this.page].info.tekst);
  }

  prevPage() {
    if(this.page == 0) {
      this.prevE = false;
    }
    else {
      this.page--;
      if(this.page == 0) {}
      this.prevE = false;
    }

    this.nextE = true;

    this.textEditorService.changeText(this.filteredInfo[this.page].info.tekst);
  }

}
