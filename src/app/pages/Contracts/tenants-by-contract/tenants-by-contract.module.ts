import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/_codemono/pipes.module';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomAdapter, DatePickerService } from 'src/app/services/_codemono/datepicker.service';

import { TenantsByContractRoutes } from './tenants-by-contract.routes';
import { TenantsByContractComponent } from './tenants-by-contract.component';
import { TenantsByContractListComponent } from './tenants-by-contract-list/tenants-by-contract-list.component';
import { TenantsByContractFormComponent } from './tenants-by-contract-form/tenants-by-contract-form.component';


@NgModule({
  declarations: [
    TenantsByContractComponent,
    TenantsByContractListComponent,
    TenantsByContractFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(TenantsByContractRoutes),
    PipesModule,
    NgbModule,
    TableModule,
    SidebarModule,
    NgSelectModule
  ],
  bootstrap: [TenantsByContractComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: DatePickerService}
  ]
})

export class TenantsByContractModule { }

