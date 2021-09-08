import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
})

export class TenantFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmTenant: FormGroup;

  // validation form
  validation = false;
  
  // Tenant Model
  tenant = new TenantModel();
  tenantId = 0;
  tenantActive = true;
  companyList: any[] = [];

  // Filter
  tenantFilter = new TenantModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private tenantService: TenantService
  ) {
    this.createForm();
    this.companyService.getList(new CompanyModel()).subscribe((res: any) => {
      this.companyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.tenantId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmTenant = this.formBuilder.group({
      tenantName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      document: new FormControl(null, [Validators.maxLength(50)]),
      telephone: new FormControl(null, [Validators.maxLength(30)]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(80)]),
      address: new FormControl(null, [Validators.maxLength(200)]),
      observation: new FormControl(null, [Validators.maxLength(500)]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.tenantService.get(this.tenantId).subscribe((res: any) => {
      this.tenant = res.data[0];

      this.frmTenant.get('tenantName').setValue(this.tenant.tenantName);
      this.frmTenant.get('document').setValue(this.tenant.document);
      this.frmTenant.get('telephone').setValue(this.tenant.telephone);
      this.frmTenant.get('mobile').setValue(this.tenant.mobile);
      this.frmTenant.get('email').setValue(this.tenant.email);
      this.frmTenant.get('address').setValue(this.tenant.address);
      this.frmTenant.get('observation').setValue(this.tenant.observation);
      this.frmTenant.get('compayId').setValue(this.tenant.compayId);



      // Enable disable form
      
      if (this.tenantActive) {
        this.frmTenant.enable();
      }
      else {
        this.frmTenant.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmTenant.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let tenant: TenantModel =  new TenantModel();
    tenant = this.frmTenant.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      tenant.tenantId = this.tenantId;
      this.tenantService.update(tenant).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Tenants/tenant']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('Error', 'Unexpected error', 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.tenantService.create(tenant).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Tenants/tenant']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('Error', 'Unexpected error', 'error');
      },
      () => {
        // Complete
      });
    }

  }


  changeStatus(status: boolean, tenant: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${tenant.tenantId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.tenantService.enable(tenant.tenantId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record enabled', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('Error', 'Unexpected error', 'error');
          },
          () => {
            // Complete
          });
        }
      });
    }
    if (status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to disable this record?</h4>
        <br> <strong>Record # ${tenant.tenantId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.tenantService.disable(tenant.tenantId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record disabled', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('Error', 'Unexpected error', 'error');
          },
          () => {
            // Complete
          });
        }
      });
    }
  }

 
  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmTenant.controls; }

}
