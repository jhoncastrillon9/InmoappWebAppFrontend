import { Routes } from '@angular/router';
import { ImagesComponent } from './images.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImagesFormComponent } from './images-form/images-form.component';

export const ImagesRoutes: Routes = [
  {
    path: '',
    component: ImagesComponent,
    children: [
      {
        path: '',
        component: ImagesListComponent,
      },
      {
        path: 'add',
        component: ImagesFormComponent,
      },
      {
        path: 'edit/:id',
        component: ImagesFormComponent,
      }
    ],
  },
];

