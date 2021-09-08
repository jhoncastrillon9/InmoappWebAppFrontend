import { Routes } from '@angular/router';
import { TenantsByContractComponent } from './tenants-by-contract.component';
import { TenantsByContractListComponent } from './tenants-by-contract-list/tenants-by-contract-list.component';
import { TenantsByContractFormComponent } from './tenants-by-contract-form/tenants-by-contract-form.component';

export const TenantsByContractRoutes: Routes = [
  {
    path: '',
    component: TenantsByContractComponent,
    children: [
      {
        path: '',
        component: TenantsByContractListComponent,
      },
      {
        path: 'add',
        component: TenantsByContractFormComponent,
      },
      {
        path: 'edit/:id',
        component: TenantsByContractFormComponent,
      }
    ],
  },
];

