import { Routes } from '@angular/router';
import { CardListingComponent } from './card-listing/card-listing.component';
import { ProjectsComponent } from './projects.component';
import { TableListingComponent } from './table-listing/table-listing.component';

export const ProjectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: 'card-list',
        component: CardListingComponent,
      },
      {
        path: 'table-list',
        component: TableListingComponent,
      },
    ],
  },
];
