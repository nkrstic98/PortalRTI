import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  uri = 'http://localhost:4000/subjects';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Subject[]>(`${this.uri}`);
  }

  addSubject(subject) {
    return this.http.post(`${this.uri}/addSubject`, subject);
  }

  editSubject(subject) {
    return this.http.post(`${this.uri}/edit`, subject);
  }

  delete(subject) {
    return this.http.post(`${this.uri}/delete`, {sifra: subject});
  }

  getSubject(subject) {
    return this.http.get(`${this.uri}/${subject}`);
  }

  uploadDocuments(formData) {
    let directory = {
      subject: formData.get('subject'),
      dir: formData.get('dir')
    }

    return this.http.post(`${this.uri}/upload/${JSON.stringify(directory)}`, formData);
  }

  deleteDocument(file, subject, location, dst) {
    return this.http.post(`${this.uri}/deleteFile`, {file: file, subject: subject, location: location, dst: dst});
  }

  reorderDocuments(fileList, subject, dest) {
    return this.http.post(`${this.uri}/reorderFiles`, {fileList: fileList, subject: subject, dest: dest});
  }

  uploadNotificationFiles(formData) {
    let directory = {
      subject: formData.get('subject'),
      dir: formData.get('dir')
    }

    return this.http.post(`${this.uri}/uploadNotification/${JSON.stringify(directory)}`, formData);
  }

  deleteNotificationFile(subject, file) {
    return this.http.post(`${this.uri}/deleteNotificationFile`, {subject: subject, file: file})
  }
}
