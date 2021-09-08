import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartRoutes } from './start.routes';
import { StartComponent } from './start.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomAdapter } from '../ng-bootstrap/datepicker/dateadapter.service';
import { CustomDateParserFormatter } from '../ng-bootstrap/datepicker/parseformatter.service';
import { ChartjsModule } from '@ctrl/ngx-chartjs';

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(StartRoutes),
    NgbModule,
    ChartjsModule
  ],
  bootstrap: [StartComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class StartModule { }
