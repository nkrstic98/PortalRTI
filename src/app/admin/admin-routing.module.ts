import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {StudentManagementComponent} from './student-management/student-management.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'home', component: HomeAdminComponent },
      { path: 'studentManagement', component: StudentManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
