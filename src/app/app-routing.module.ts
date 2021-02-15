import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home-pages/home/home.component';
import {ContactComponent} from './home-pages/contact/contact.component';
import {NotificationsComponent} from './home-pages/notifications/notifications.component';
import {WorkersComponent} from './home-pages/workers/workers.component';
import {WorkersDetailsComponent} from './home-pages/workers/workers-details/workers-details.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const teacherModule = () => import('./teacher/teacher.module').then(x => x.TeacherModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule },
  { path: 'teacher', loadChildren: teacherModule },
  { path: 'contact', component: ContactComponent, data: {
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
  { path: 'workers/workerDetails/:fullname', component: WorkersDetailsComponent, data: {
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
          label: '{{fullname}}',
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
