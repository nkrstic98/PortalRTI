import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {StudentManagementComponent} from './student-management/student-management.component';
import {RegisterStudentComponent} from '../account/register-student/register-student.component';
import {EditStudentComponent} from './student-management/edit-student/edit-student.component';
import {WorkerManagementComponent} from './worker-management/worker-management.component';
import {RegisterWorkerComponent} from '../account/register-worker/register-worker.component';
import {EditWorkerComponent} from './worker-management/edit-worker/edit-worker.component';
import {CreateNotificationComponent} from '../notifications/create-notification/create-notification.component';
import {SubjectManagementComponent} from './subject-management/subject-management.component';
import {AddSubjectComponent} from './subject-management/add-subject/add-subject.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'home', component: HomeAdminComponent },
      { path: 'studentManagement', component: StudentManagementComponent, data: {
          title: 'Studenti',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Studenti',
              url: ''
            }
          ]
        }
      },
      { path: 'studentManagement/addStudent', component: RegisterStudentComponent, data: {
          title: 'AddStudent',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Studenti',
              url: 'admin/studentManagement'
            },
            {
              label: 'Registracija studenata',
              url: ''
            }
          ]
        }
      },
      { path: 'studentManagement/editStudent/:username', component: EditStudentComponent, data: {
          title: 'EditStudent',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Studenti',
              url: 'admin/studentManagement'
            },
            {
              label: 'Ažuriranje studenta "{{username}}"',
              url: ''
            }
          ]
        }
      },
      { path: 'workerManagement', component: WorkerManagementComponent, data: {
          title: 'Radnici',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Zaposleni',
              url: ''
            }
          ]
        }
      },
      { path: 'workerManagement/addWorker', component: RegisterWorkerComponent, data: {
          title: 'AddWorker',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Zaposleni',
              url: 'admin/workerManagement'
            },
            {
              label: 'Registracija zaposlenih',
              url: ''
            }
          ]
        }
      },
      { path: 'workerManagement/editWorker/:username', component: EditWorkerComponent, data: {
          title: 'EditWorker',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Zaposleni',
              url: 'admin/workerManagement'
            },
            {
              label: 'Ažuriranje zaposlenog "{{username}}"',
              url: ''
            }
          ]
        }
      },
      {
        path: 'subjects', component:SubjectManagementComponent, data: {
          title: 'Subjects',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Predmeti',
              url: ''
            }
          ]
        }
      },
      {
        path: 'subjects/addSubject', component:AddSubjectComponent, data: {
          title: 'Subjects',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Predmeti',
              url: 'admin/subjects'
            },
            {
              label: 'Dodavanje predmeta',
              url: ''
            }
          ]
        }
      },
      {
        path: 'notifications', component: CreateNotificationComponent, data: {
          title: 'Notifications',
          breadcrumb: [
            {
              label: 'Početna',
              url: 'admin/home'
            },
            {
              label: 'Obaveštenja',
              url: ''
            }
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
