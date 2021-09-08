import { Routes } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { NgBootstrapComponent } from './ng-bootstrap.component';
import { NavComponent } from './nav/nav.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { TableComponent } from './table/table.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { ToastComponent } from './toast/toast.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { TooltipComponent } from './tooltip/tooltip.component';

export const NgBootstrapRoutes: Routes = [
  {
    path: '',
    component: NgBootstrapComponent,
    children: [
      {
        path: 'accordion',
        component: AccordionComponent,
      },
      {
        path: 'alert',
        component: AlertComponent,
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'carousel',
        component: CarouselComponent,
      },
      {
        path: 'collapse',
        component: CollapseComponent,
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
      },
      {
        path: 'dropdown',
        component: DropdownComponent,
      },
      {
        path: 'modal',
        component: ModalComponent,
      },
      {
        path: 'nav',
        component: NavComponent,
      },
      {
        path: 'pagination',
        component: PaginationComponent,
      },
      {
        path: 'popover',
        component: PopoverComponent,
      },
      {
        path: 'progressbar',
        component: ProgressbarComponent,
      },
      {
        path: 'rating',
        component: RatingComponent,
      },
      {
        path: 'table',
        component: TableComponent,
      },
      {
        path: 'timepicker',
        component: TimepickerComponent,
      },
      {
        path: 'toast',
        component: ToastComponent,
      },
      {
        path: 'tooltip',
        component: TooltipComponent,
      },
      {
        path: 'typeahead',
        component: TypeaheadComponent,
      },
    ],
  },
];
