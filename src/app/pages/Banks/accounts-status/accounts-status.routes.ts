import { Routes } from '@angular/router';
import { AccountsStatusComponent } from './accounts-status.component';
import { AccountsStatusListComponent } from './accounts-status-list/accounts-status-list.component';
import { AccountsStatusFormComponent } from './accounts-status-form/accounts-status-form.component';

export const AccountsStatusRoutes: Routes = [
  {
    path: '',
    component: AccountsStatusComponent,
    children: [
      {
        path: '',
        component: AccountsStatusListComponent,
      },
      {
        path: 'add',
        component: AccountsStatusFormComponent,
      },
      {
        path: 'edit/:id',
        component: AccountsStatusFormComponent,
      }
    ],
  },
];

