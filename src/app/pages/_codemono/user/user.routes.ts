import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'add',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
      }
    ],
  },
];
