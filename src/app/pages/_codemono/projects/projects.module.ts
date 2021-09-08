import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutes } from './projects.routes';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardListingComponent } from './card-listing/card-listing.component';
import { TableListingComponent } from './table-listing/table-listing.component';



@NgModule({
  declarations: [ProjectsComponent, CardListingComponent, TableListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectsRoutes),
    NgbModule,
  ],
  bootstrap: [ProjectsComponent]
})
export class ProjectsModule { }
