import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutInitialComponent } from './layout/layout-initial/layout-initial.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/_codemono/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/_codemono/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'start',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/start/start.module').then((m) => m.StartModule),
      }
    ]
  },
  {
    path: 'profile',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/profile/profile.module').then((m) => m.ProfileModule),
      }
    ]
  },
  {
    path: 'user',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/user/user.module').then((m) => m.UserModule),
      }
    ]
  },
  {
    path: 'ng-bootstrap',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/ng-bootstrap/ng-bootstrap.module').then((m) => m.NgBootstrapModule),
      }
    ]
  },
  {
    path: 'projects',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/projects/projects.module').then((m) => m.ProjectsModule),
      }
    ]
  },
  {
    path: 'task',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/_codemono/task/task.module').then((m) => m.TaskModule),
      }
    ]
  },
  {
    path: 'Banks/accountsStatus',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/accounts-status/accounts-status.module').then((m) => m.AccountsStatusModule),
      }
    ]
  },
  {
    path: 'Banks/accountsToPayContract',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/accounts-to-pay-contract/accounts-to-pay-contract.module').then((m) => m.AccountsToPayContractModule),
      }
    ]
  },
  {
    path: 'Banks/accountsToReceivableContract',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/accounts-to-receivable-contract/accounts-to-receivable-contract.module').then((m) => m.AccountsToReceivableContractModule),
      }
    ]
  },
  {
    path: 'Banks/bankAccount',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/bank-account/bank-account.module').then((m) => m.BankAccountModule),
      }
    ]
  },
  {
    path: 'Banks/historyBankAccount',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/history-bank-account/history-bank-account.module').then((m) => m.HistoryBankAccountModule),
      }
    ]
  },
  {
    path: 'Banks/paymentType',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Banks/payment-type/payment-type.module').then((m) => m.PaymentTypeModule),
      }
    ]
  },
  {
    path: 'Commons/city',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Commons/city/city.module').then((m) => m.CityModule),
      }
    ]
  },
  {
    path: 'Commons/neighborhood',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Commons/neighborhood/neighborhood.module').then((m) => m.NeighborhoodModule),
      }
    ]
  },
  {
    path: 'Commons/state',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Commons/state/state.module').then((m) => m.StateModule),
      }
    ]
  },
  {
    path: 'Commons/zone',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Commons/zone/zone.module').then((m) => m.ZoneModule),
      }
    ]
  },
  {
    path: 'Companies/company',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Companies/company/company.module').then((m) => m.CompanyModule),
      }
    ]
  },
  {
    path: 'Contracts/contract',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Contracts/contract/contract.module').then((m) => m.ContractModule),
      }
    ]
  },
  {
    path: 'Contracts/contractsStatus',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Contracts/contracts-status/contracts-status.module').then((m) => m.ContractsStatusModule),
      }
    ]
  },
  {
    path: 'Contracts/tenantsByContract',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Contracts/tenants-by-contract/tenants-by-contract.module').then((m) => m.TenantsByContractModule),
      }
    ]
  },
  {
    path: 'Owners/owner',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Owners/owner/owner.module').then((m) => m.OwnerModule),
      }
    ]
  },
  {
    path: 'Properties/images',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/images/images.module').then((m) => m.ImagesModule),
      }
    ]
  },
  {
    path: 'Properties/iva',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/iva/iva.module').then((m) => m.IvaModule),
      }
    ]
  },
  {
    path: 'Properties/property',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/property/property.module').then((m) => m.PropertyModule),
      }
    ]
  },
  {
    path: 'Properties/propertyCategory',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/property-category/property-category.module').then((m) => m.PropertyCategoryModule),
      }
    ]
  },
  {
    path: 'Properties/propertyStatus',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/property-status/property-status.module').then((m) => m.PropertyStatusModule),
      }
    ]
  },
  {
    path: 'Properties/typeOffer',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Properties/type-offer/type-offer.module').then((m) => m.TypeOfferModule),
      }
    ]
  },
  {
    path: 'Tenants/tenant',
    component: LayoutInitialComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/Tenants/tenant/tenant.module').then((m) => m.TenantModule),
      }
    ]
  },
  // CODEMONO: NO REMOVE THIS COMMENT (ROUTING MODULE)
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






















