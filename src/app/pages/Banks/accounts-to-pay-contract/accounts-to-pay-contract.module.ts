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

import { AccountsToPayContractRoutes } from './accounts-to-pay-contract.routes';
import { AccountsToPayContractComponent } from './accounts-to-pay-contract.component';
import { AccountsToPayContractListComponent } from './accounts-to-pay-contract-list/accounts-to-pay-contract-list.component';
import { AccountsToPayContractFormComponent } from './accounts-to-pay-contract-form/accounts-to-pay-contract-form.component';


@NgModule({
  declarations: [
    AccountsToPayContractComponent,
    AccountsToPayContractListComponent,
    AccountsToPayContractFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AccountsToPayContractRoutes),
    PipesModule,
    NgbModule,
    TableModule,
    SidebarModule,
    NgSelectModule
  ],
  bootstrap: [AccountsToPayContractComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: DatePickerService}
  ]
})

export class AccountsToPayContractModule { }

