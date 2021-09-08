import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgBootstrapRoutes } from './ng-bootstrap.routes';
import { NgBootstrapComponent } from './ng-bootstrap.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { CustomAdapter } from './datepicker/dateadapter.service';
import { CustomDateParserFormatter } from './datepicker/parseformatter.service';
import { ModalContentComponent } from './modal/modal-content/modal-content.component';
import { NavComponent } from './nav/nav.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { TableComponent } from './table/table.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { ToastComponent } from './toast/toast.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { NgbdSortableHeader } from './table/sortable.directive';
import { ToastsContainer } from './toast/toasts-container.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NgBootstrapComponent,
    AccordionComponent,
    AlertComponent,
    ButtonsComponent,
    CarouselComponent,
    CollapseComponent,
    DatepickerComponent,
    DropdownComponent,
    ModalComponent,
    ModalContentComponent,
    NavComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressbarComponent,
    RatingComponent,
    TableComponent,
    TimepickerComponent,
    ToastComponent,
    TooltipComponent,
    TypeaheadComponent,
    NgbdSortableHeader,
    ToastsContainer],
  imports: [
    CommonModule,
    RouterModule.forChild(NgBootstrapRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  bootstrap: [NgBootstrapComponent],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class NgBootstrapModule { }
