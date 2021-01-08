import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {StudentManagementComponent} from './student-management/student-management.component';
import {RegisterStudentComponent} from '../account/register-student/register-student.component';
import {EditStudentComponent} from './student-management/edit-student/edit-student.component';

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
              label: 'Ažuriranje studenta',
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
