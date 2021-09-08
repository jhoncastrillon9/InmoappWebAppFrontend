import { Routes } from '@angular/router';
import { AccountsToReceivableContractComponent } from './accounts-to-receivable-contract.component';
import { AccountsToReceivableContractListComponent } from './accounts-to-receivable-contract-list/accounts-to-receivable-contract-list.component';
import { AccountsToReceivableContractFormComponent } from './accounts-to-receivable-contract-form/accounts-to-receivable-contract-form.component';

export const AccountsToReceivableContractRoutes: Routes = [
  {
    path: '',
    component: AccountsToReceivableContractComponent,
    children: [
      {
        path: '',
        component: AccountsToReceivableContractListComponent,
      },
      {
        path: 'add',
        component: AccountsToReceivableContractFormComponent,
      },
      {
        path: 'edit/:id',
        component: AccountsToReceivableContractFormComponent,
      }
    ],
  },
];

