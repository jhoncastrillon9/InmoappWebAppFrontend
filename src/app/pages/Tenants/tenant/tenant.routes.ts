import { Routes } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';

export const TenantRoutes: Routes = [
  {
    path: '',
    component: TenantComponent,
    children: [
      {
        path: '',
        component: TenantListComponent,
      },
      {
        path: 'add',
        component: TenantFormComponent,
      },
      {
        path: 'edit/:id',
        component: TenantFormComponent,
      }
    ],
  },
];

