import { Routes } from '@angular/router';
import { AccountsToPayContractComponent } from './accounts-to-pay-contract.component';
import { AccountsToPayContractListComponent } from './accounts-to-pay-contract-list/accounts-to-pay-contract-list.component';
import { AccountsToPayContractFormComponent } from './accounts-to-pay-contract-form/accounts-to-pay-contract-form.component';

export const AccountsToPayContractRoutes: Routes = [
  {
    path: '',
    component: AccountsToPayContractComponent,
    children: [
      {
        path: '',
        component: AccountsToPayContractListComponent,
      },
      {
        path: 'add',
        component: AccountsToPayContractFormComponent,
      },
      {
        path: 'edit/:id',
        component: AccountsToPayContractFormComponent,
      }
    ],
  },
];

