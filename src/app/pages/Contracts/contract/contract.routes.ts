import { Routes } from '@angular/router';
import { ContractComponent } from './contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractFormComponent } from './contract-form/contract-form.component';

export const ContractRoutes: Routes = [
  {
    path: '',
    component: ContractComponent,
    children: [
      {
        path: '',
        component: ContractListComponent,
      },
      {
        path: 'add',
        component: ContractFormComponent,
      },
      {
        path: 'edit/:id',
        component: ContractFormComponent,
      }
    ],
  },
];

