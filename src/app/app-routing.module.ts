import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {WorkersComponent} from './workers/workers.component';
import {EditWorkerComponent} from './admin/worker-management/edit-worker/edit-worker.component';
import {WorkersDetailsComponent} from './workers/workers-details/workers-details.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule },
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
