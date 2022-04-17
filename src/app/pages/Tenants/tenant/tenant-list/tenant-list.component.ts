import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { TenantService } from 'src/app/services/Tenants/tenant.service';

import { CompanyModel } from 'src/app/models/Companies/company.model';

import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})

export class TenantListComponent extends BaseCommonsComponent {

  // load Tenants
  tenants: any[] = [];
  tenant: TenantModel;

  // Filter
  frmFilter: FormGroup;
  tenantFilter = new TenantModel();
  showFiller = false; 


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private tenantService: TenantService,
    private cd: ChangeDetectorRef,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    public router: Router) {
      super(router);
        this.createForm();
  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      tenantId: new FormControl(null),
      tenantName: new FormControl(null),
      document: new FormControl(null),
      telephone: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null),
      address: new FormControl(null),
      observation: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
 load(): void {
    this.showLoading = true;
    this.tenants = [];

    this.tenantService.getAll(this.tenantFilter).subscribe(
      (res: any) => {
        this.tenants = res.data;
      },
      (err) => {         
        this.showAlertGeneralError(err);        
      },
      () => {
        this.showLoading = false;
      }
    );
  }


  // Filter sidebar
  openFilter(status: boolean): void {
    this.showFiller = status;
  } 

  delete(tenant: any){
    if (!status) {
      Swal.fire(this.createAlertDelete('Arrendatario',tenant.tenantName)).then((result) => {
        if (result.value) {
          this.tenantService.delete(tenant.tenantId).subscribe((res: any) => {
           this.validateRequestDelete(res);
          },
          (err) => {
            // Error            
            this.showAlertGeneralError(err);            
          },
          () => {
            // Complete
          });
        }
      });
    }
  }


  // Searh register
  searchList(): void {
    this.tenantFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.tenantFilter = new TenantModel();
    this.frmFilter.reset();
    this.load();
  }




}






