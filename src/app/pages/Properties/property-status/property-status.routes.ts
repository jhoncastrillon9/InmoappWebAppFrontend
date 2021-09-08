import { Routes } from '@angular/router';
import { PropertyStatusComponent } from './property-status.component';
import { PropertyStatusListComponent } from './property-status-list/property-status-list.component';
import { PropertyStatusFormComponent } from './property-status-form/property-status-form.component';

export const PropertyStatusRoutes: Routes = [
  {
    path: '',
    component: PropertyStatusComponent,
    children: [
      {
        path: '',
        component: PropertyStatusListComponent,
      },
      {
        path: 'add',
        component: PropertyStatusFormComponent,
      },
      {
        path: 'edit/:id',
        component: PropertyStatusFormComponent,
      }
    ],
  },
];

