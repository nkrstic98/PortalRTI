import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectLecturesComponent} from './subject-lectures/subject-lectures.component';
import {EditSubjectComponent} from '../admin/subject-management/edit-subject/edit-subject.component';
import {SubjectExercisesComponent} from './subject-exercises/subject-exercises.component';
import {SubjectExamsComponent} from './subject-exams/subject-exams.component';
import {SubjectLabComponent} from './subject-lab/subject-lab.component';
import {SubjectProjectComponent} from './subject-project/subject-project.component';
import {SubjectAboutComponent} from './subject-about/subject-about.component';
import {SubjectInformationComponent} from './subject-information/subject-information.component';

const routes: Routes = [
  {
    path: ':sifra/notifications', component: SubjectInformationComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Obaveštenja',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/about', component: SubjectAboutComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'O predmetu',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/edit_about', component: EditSubjectComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Ažuriranje informacija o predmetu',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/lectures', component: SubjectLecturesComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Predavanja',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/exercises', component: SubjectExercisesComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Vežbe',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/exams', component: SubjectExamsComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Ispitna pitanja',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/labs', component: SubjectLabComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Laboratorijske vežbe',
          url: ''
        }
      ]
    }
  },
  {
    path: ':sifra/projects', component: SubjectProjectComponent, data: {
      title: 'Subjects',
      breadcrumb: [
        {
          label: 'Početna',
          url: '/'
        },
        {
          label: '{{sifra}}',
          url: ''
        },
        {
          label: 'Projekti i domaći zadaci',
          url: ''
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
