import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routes';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileListComponent } from './profile-list/profile-list.component';



@NgModule({
  declarations: [ProfileComponent, ProfileListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    NgbModule,
  ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
