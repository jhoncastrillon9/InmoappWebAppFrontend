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

import { AccountsToReceivableContractRoutes } from './accounts-to-receivable-contract.routes';
import { AccountsToReceivableContractComponent } from './accounts-to-receivable-contract.component';
import { AccountsToReceivableContractListComponent } from './accounts-to-receivable-contract-list/accounts-to-receivable-contract-list.component';
import { AccountsToReceivableContractFormComponent } from './accounts-to-receivable-contract-form/accounts-to-receivable-contract-form.component';


@NgModule({
  declarations: [
    AccountsToReceivableContractComponent,
    AccountsToReceivableContractListComponent,
    AccountsToReceivableContractFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AccountsToReceivableContractRoutes),
    PipesModule,
    NgbModule,
    TableModule,
    SidebarModule,
    NgSelectModule
  ],
  bootstrap: [AccountsToReceivableContractComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: DatePickerService}
  ]
})

export class AccountsToReceivableContractModule { }

