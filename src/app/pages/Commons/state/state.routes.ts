import { Routes } from '@angular/router';
import { StateComponent } from './state.component';
import { StateListComponent } from './state-list/state-list.component';
import { StateFormComponent } from './state-form/state-form.component';

export const StateRoutes: Routes = [
  {
    path: '',
    component: StateComponent,
    children: [
      {
        path: '',
        component: StateListComponent,
      },
      {
        path: 'add',
        component: StateFormComponent,
      },
      {
        path: 'edit/:id',
        component: StateFormComponent,
      }
    ],
  },
];

