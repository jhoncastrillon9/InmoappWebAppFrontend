import { Routes } from '@angular/router';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { PaymentTypeFormComponent } from './payment-type-form/payment-type-form.component';

export const PaymentTypeRoutes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    children: [
      {
        path: '',
        component: PaymentTypeListComponent,
      },
      {
        path: 'add',
        component: PaymentTypeFormComponent,
      },
      {
        path: 'edit/:id',
        component: PaymentTypeFormComponent,
      }
    ],
  },
];

