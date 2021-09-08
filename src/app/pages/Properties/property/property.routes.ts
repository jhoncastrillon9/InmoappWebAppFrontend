import { Routes } from '@angular/router';
import { PropertyComponent } from './property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyFormComponent } from './property-form/property-form.component';

export const PropertyRoutes: Routes = [
  {
    path: '',
    component: PropertyComponent,
    children: [
      {
        path: '',
        component: PropertyListComponent,
      },
      {
        path: 'add',
        component: PropertyFormComponent,
      },
      {
        path: 'edit/:id',
        component: PropertyFormComponent,
      }
    ],
  },
];

