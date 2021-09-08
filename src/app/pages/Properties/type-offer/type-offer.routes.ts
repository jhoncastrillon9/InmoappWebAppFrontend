import { Routes } from '@angular/router';
import { TypeOfferComponent } from './type-offer.component';
import { TypeOfferListComponent } from './type-offer-list/type-offer-list.component';
import { TypeOfferFormComponent } from './type-offer-form/type-offer-form.component';

export const TypeOfferRoutes: Routes = [
  {
    path: '',
    component: TypeOfferComponent,
    children: [
      {
        path: '',
        component: TypeOfferListComponent,
      },
      {
        path: 'add',
        component: TypeOfferFormComponent,
      },
      {
        path: 'edit/:id',
        component: TypeOfferFormComponent,
      }
    ],
  },
];

