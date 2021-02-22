import { Component, OnInit } from '@angular/core';
import {Information, Subject} from '../../models/subject';
import {Subscription} from 'rxjs';
import {SubjectService} from '../../services/subject.service';
import {TextEditorService} from '../../services/text-editor.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ScheduleService} from '../../services/schedule.service';
import {Schedule} from '../../models/schedule';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  info: Information = {
    id: null,
    naslov: "",
    tekst: "",
    datum: null,
    fajlovi: [],
    autor: JSON.parse(localStorage.getItem('user')).username
  }

  filesToUpload: Array<File> = [];
  subjects: Subject[];

  subjectArray = [];
  schedule: Array<Schedule> = [];

  subscription: Subscription;

  submitted: boolean;

  uploadError: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private textEditorService: TextEditorService,
    private alertService: AlertService,
    private scheduleService: ScheduleService
  ) {
    this.subscription = this.textEditorService.text.subscribe(value => this.info.tekst = value);
  }

  ngOnInit(): void {
    this.submitted = false;

    this.textEditorService.changeText(null);

    this.subjectService.getAll()
      .pipe(first())
      .subscribe(value => {
        this.subjects = value;
      })

    this.scheduleService.getSchedule()
      .pipe(first())
      .subscribe((value: Schedule[]) => {
        this.schedule = value;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fileChangeEvent(event) {
    this.filesToUpload = <Array<File>> event.target.files;
  }

  getTeacherSubjects(): Subject[] {

    let teacherSchedule: Array<Subject> = [];
    let teacher = JSON.parse(localStorage.getItem('user'));

    this.schedule.forEach(value => {
      if(value.predavanja.find(p => p.zaposleni.find(t => t == teacher.username)) || value.vezbe.find(v => v.zaposleni.find(t => t == teacher.username))) {
        if(teacherSchedule.find(v => v == this.subjects.find(s => s.sifra == value.predmet)) == undefined) {
          teacherSchedule.push(this.subjects.find(s => s.sifra == value.predmet));
        }
      }
    })

    return teacherSchedule;
  }

  upload() {
    console.log(this.info);
    //return;

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
          this.info.id = subject.obavestenja.length + 1;
          subject.obavestenja.push(this.info);

          this.subjectService.editSubject(subject)
            .pipe(first())
            .subscribe({
              next: () => {
                this.info.id = null;
                this.info.naslov = "";
                this.info.datum = null;
                this.info.fajlovi = [];
                this.textEditorService.changeText(null);
                this.submitted = false;
                this.filesToUpload = [];
              },
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
