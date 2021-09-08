import { Routes } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';

export const ZoneRoutes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    children: [
      {
        path: '',
        component: ZoneListComponent,
      },
      {
        path: 'add',
        component: ZoneFormComponent,
      },
      {
        path: 'edit/:id',
        component: ZoneFormComponent,
      }
    ],
  },
];

