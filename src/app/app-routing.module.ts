import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home-pages/home/home.component';
import {ContactComponent} from './home-pages/contact/contact.component';
import {NotificationsComponent} from './home-pages/notifications/notifications.component';
import {WorkersComponent} from './home-pages/workers/workers.component';
import {WorkersDetailsComponent} from './home-pages/workers/workers-details/workers-details.component';
import {ScienceResearchComponent} from './home-pages/science-research/science-research.component';
import {ScienceProjectsComponent} from './home-pages/science-projects/science-projects.component';
import {ProjectsComponent} from './home-pages/projects/projects.component';
import {SubjectsListComponent} from './home-pages/subjects-list/subjects-list.component';
import {SubjectComponent} from './subject/subject.component';
import {ListManagementComponent} from './teacher/list-management/list-management.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const teacherModule = () => import('./teacher/teacher.module').then(x => x.TeacherModule);
const subjectModule = () => import('./subject/subject.module').then(x => x.SubjectModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule },
  { path: 'teacher', loadChildren: teacherModule },
  { path: 'subjects', component: SubjectComponent, loadChildren: subjectModule },
  { path: 'workers', component: WorkersComponent, data: {
      title: 'Workers',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Zaposleni',
          url: ''
        }
      ]
    }
  },
  { path: 'workers/workerDetails/:username', component: WorkersDetailsComponent, data: {
      title: 'WorkerDetails',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Zaposleni',
          url: 'workers'
        },
        {
          label: 'Detalji o zaposlenom',
          url: ''
        }
      ]
    }
  },
  { path: 'notifications', component: NotificationsComponent, data: {
    title: 'Notifications',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Obaveštenja',
          url: ''
        }
      ]
    }
  },
  { path: 'studies/:studies_type/:program', component: SubjectsListComponent, data: {
    title: 'Studies',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{program}}',
          url: ''
        }
      ]
    }
  },
  {
    path: 'projects', component: ProjectsComponent, data: {
      title: 'Projects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Projekti',
          url: ''
        }
      ]
    }
  },
  {
    path: 'science/research', component: ScienceResearchComponent, data: {
      title: 'ScienceResearch',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Nauka - Istraživanja',
          url: ''
        }
      ]
    }
  },
  {
    path: 'science/projects', component: ScienceProjectsComponent, data: {
      title: 'ScienceProjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Nauka - Projekti',
          url: ''
        }
      ]
    }
  },
  { path: 'contact', component: ContactComponent, data:
      {
        title: 'Contact',
        breadcrumb: [
          {
            label: 'Početna',
            url: '/'
          },
          {
            label: 'Kontakt',
            url: ''
          }
        ]
      }
  },
  {
    path: 'lists', component: ListManagementComponent, data: {
      title: 'Lists',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: 'Spiskovi',
          url: ''
        }
      ]
    }
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
