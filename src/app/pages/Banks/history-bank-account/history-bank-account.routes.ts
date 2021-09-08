import { Routes } from '@angular/router';
import { HistoryBankAccountComponent } from './history-bank-account.component';
import { HistoryBankAccountListComponent } from './history-bank-account-list/history-bank-account-list.component';
import { HistoryBankAccountFormComponent } from './history-bank-account-form/history-bank-account-form.component';

export const HistoryBankAccountRoutes: Routes = [
  {
    path: '',
    component: HistoryBankAccountComponent,
    children: [
      {
        path: '',
        component: HistoryBankAccountListComponent,
      },
      {
        path: 'add',
        component: HistoryBankAccountFormComponent,
      },
      {
        path: 'edit/:id',
        component: HistoryBankAccountFormComponent,
      }
    ],
  },
];

