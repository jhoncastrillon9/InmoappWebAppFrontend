import { Routes } from '@angular/router';
import { IvaComponent } from './iva.component';
import { IvaListComponent } from './iva-list/iva-list.component';
import { IvaFormComponent } from './iva-form/iva-form.component';

export const IvaRoutes: Routes = [
  {
    path: '',
    component: IvaComponent,
    children: [
      {
        path: '',
        component: IvaListComponent,
      },
      {
        path: 'add',
        component: IvaFormComponent,
      },
      {
        path: 'edit/:id',
        component: IvaFormComponent,
      }
    ],
  },
];

