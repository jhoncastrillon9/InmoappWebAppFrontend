import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

export const CompanyRoutes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent,
      },
      {
        path: 'add',
        component: CompanyFormComponent,
      },
      {
        path: 'edit/:id',
        component: CompanyFormComponent,
      }
    ],
  },
];

