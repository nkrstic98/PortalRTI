import { Component, OnInit } from '@angular/core';
import {Information, Subject} from '../../models/subject';
import {User} from '../../models/user';
import {SubjectService} from '../../services/subject.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TextEditorService} from '../../services/text-editor.service';
import {AlertService} from '../../services/alert.service';
import {Schedule} from '../../models/schedule';
import {ScheduleService} from '../../services/schedule.service';

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
  }> = [];

  filteredInfo: Array<{
    subject: string;
    info: Information;
  }> = [];

  mySubjects: Subject[] = [];
  schedule: Array<Schedule> = [];

  user: User;

  submitted: boolean = false;

  subscription: Subscription;

  constructor(
    private subjectService: SubjectService,
    private textEditorService: TextEditorService,
    private alertService: AlertService,
    private scheduleService: ScheduleService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subscription = this.textEditorService.text.subscribe(value => this.newText = value);
  }

  ngOnInit(): void {
    this.subjectInfo = [];

    this.scheduleService.getSchedule()
      .pipe(first())
      .subscribe((value: Schedule[]) => {
        this.schedule = value;
      })

    this.subjectService.getAll()
      .pipe(first())
      .subscribe(subjects => {

        this.schedule.forEach(value => {
          if(value.predavanja.find(p => p.zaposleni.find(t => t == this.user.username)) || value.vezbe.find(v => v.zaposleni.find(t => t == this.user.username))) {
            if(this.mySubjects.find(v => v == subjects.find(s => s.sifra == value.predmet)) == undefined) {
              this.mySubjects.push(subjects.find(s => s.sifra == value.predmet));
            }
          }
        })

        let info;

        this.mySubjects.forEach(subject => {
          if (subject.obavestenja.length != 0) {

            let subInfo = subject.obavestenja;

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

        if(this.filteredInfo.length > 0) {
          this.textEditorService.changeText(this.filteredInfo[0].info.tekst);
        }

        this.page = 0;
        this.prevE = false;
        if (this.filteredInfo.length > 1) {
          this.nextE = true;
        }
        else {
          this.nextE = false;
        }


      })

    console.log(this.subjectInfo);

    console.log(this.filteredInfo);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
              this.alertService.error('Greška prilikom ažuriranja vesti', {autoClose: true});
            }
          })
      })
  }

  delete() {
    this.subjectService.getSubject(this.filteredInfo[this.page].subject)
      .pipe(first())
      .subscribe((subject: Subject) => {
        for(let i = 0; i < this.filteredInfo[this.page].info.fajlovi.length; i++) {
          this.subjectService.deleteNotificationFile(this.filteredInfo[this.page].subject, this.filteredInfo[this.page].info.fajlovi[i])
            .pipe(first())
            .subscribe()
        }

        subject.obavestenja = [];
        this.subjectService.editSubject(subject)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Uspešno ste obirsali vest!', {autoClose: true});
              this.ngOnInit();
            },
            error: () => {
              this.alertService.error('Greška prilikom brisanja vesti', {autoClose: true});
            }
          })
      })
  }

  chooseSubject(event) {
    if(event.target.value != '') {
      this.filteredInfo = this.subjectInfo.filter(value => value.subject == event.target.value);
    }
    else {
      this.filteredInfo = this.subjectInfo;
    }
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
      if(this.page == 0) {
        this.prevE = false;
      }
    }

    this.nextE = true;

    this.textEditorService.changeText(this.filteredInfo[this.page].info.tekst);
  }

}
