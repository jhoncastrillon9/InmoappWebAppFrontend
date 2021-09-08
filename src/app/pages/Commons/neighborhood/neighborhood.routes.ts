import { Routes } from '@angular/router';
import { NeighborhoodComponent } from './neighborhood.component';
import { NeighborhoodListComponent } from './neighborhood-list/neighborhood-list.component';
import { NeighborhoodFormComponent } from './neighborhood-form/neighborhood-form.component';

export const NeighborhoodRoutes: Routes = [
  {
    path: '',
    component: NeighborhoodComponent,
    children: [
      {
        path: '',
        component: NeighborhoodListComponent,
      },
      {
        path: 'add',
        component: NeighborhoodFormComponent,
      },
      {
        path: 'edit/:id',
        component: NeighborhoodFormComponent,
      }
    ],
  },
];

