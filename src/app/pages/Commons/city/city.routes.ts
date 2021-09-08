import { Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityFormComponent } from './city-form/city-form.component';

export const CityRoutes: Routes = [
  {
    path: '',
    component: CityComponent,
    children: [
      {
        path: '',
        component: CityListComponent,
      },
      {
        path: 'add',
        component: CityFormComponent,
      },
      {
        path: 'edit/:id',
        component: CityFormComponent,
      }
    ],
  },
];

