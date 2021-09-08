import { Routes } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountListComponent } from './bank-account-list/bank-account-list.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';

export const BankAccountRoutes: Routes = [
  {
    path: '',
    component: BankAccountComponent,
    children: [
      {
        path: '',
        component: BankAccountListComponent,
      },
      {
        path: 'add',
        component: BankAccountFormComponent,
      },
      {
        path: 'edit/:id',
        component: BankAccountFormComponent,
      }
    ],
  },
];

