import { Routes } from '@angular/router';
import { PropertyCategoryComponent } from './property-category.component';
import { PropertyCategoryListComponent } from './property-category-list/property-category-list.component';
import { PropertyCategoryFormComponent } from './property-category-form/property-category-form.component';

export const PropertyCategoryRoutes: Routes = [
  {
    path: '',
    component: PropertyCategoryComponent,
    children: [
      {
        path: '',
        component: PropertyCategoryListComponent,
      },
      {
        path: 'add',
        component: PropertyCategoryFormComponent,
      },
      {
        path: 'edit/:id',
        component: PropertyCategoryFormComponent,
      }
    ],
  },
];

