import { Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';

export const OwnerRoutes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      {
        path: '',
        component: OwnerListComponent,
      },
      {
        path: 'add',
        component: OwnerFormComponent,
      },
      {
        path: 'edit/:id',
        component: OwnerFormComponent,
      }
    ],
  },
];

