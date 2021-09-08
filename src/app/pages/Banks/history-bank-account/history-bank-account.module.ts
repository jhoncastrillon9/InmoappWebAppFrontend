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

import { HistoryBankAccountRoutes } from './history-bank-account.routes';
import { HistoryBankAccountComponent } from './history-bank-account.component';
import { HistoryBankAccountListComponent } from './history-bank-account-list/history-bank-account-list.component';
import { HistoryBankAccountFormComponent } from './history-bank-account-form/history-bank-account-form.component';


@NgModule({
  declarations: [
    HistoryBankAccountComponent,
    HistoryBankAccountListComponent,
    HistoryBankAccountFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HistoryBankAccountRoutes),
    PipesModule,
    NgbModule,
    TableModule,
    SidebarModule,
    NgSelectModule
  ],
  bootstrap: [HistoryBankAccountComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: DatePickerService}
  ]
})

export class HistoryBankAccountModule { }

