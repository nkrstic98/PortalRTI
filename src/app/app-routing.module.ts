import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule },
  { path: 'contact', component: ContactComponent, data: {
      title: 'Contact',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/',
        },
        {
          label: 'Kontakt',
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
