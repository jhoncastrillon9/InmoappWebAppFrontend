import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyFormComponent } from './company-form/company-form.component';

export const CompanyRoutes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: 'edit/:id',
        component: CompanyFormComponent,
      }
    ],
  },
];

