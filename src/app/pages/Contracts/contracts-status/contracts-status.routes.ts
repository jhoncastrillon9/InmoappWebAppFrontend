import { Routes } from '@angular/router';
import { ContractsStatusComponent } from './contracts-status.component';
import { ContractsStatusListComponent } from './contracts-status-list/contracts-status-list.component';
import { ContractsStatusFormComponent } from './contracts-status-form/contracts-status-form.component';

export const ContractsStatusRoutes: Routes = [
  {
    path: '',
    component: ContractsStatusComponent,
    children: [
      {
        path: '',
        component: ContractsStatusListComponent,
      },
      {
        path: 'add',
        component: ContractsStatusFormComponent,
      },
      {
        path: 'edit/:id',
        component: ContractsStatusFormComponent,
      }
    ],
  },
];

