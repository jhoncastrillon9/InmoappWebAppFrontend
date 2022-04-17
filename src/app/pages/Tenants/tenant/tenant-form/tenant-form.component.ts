import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
})

export class TenantFormComponent extends BaseCommonsComponent {
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
  // Filter
  tenantFilter = new TenantModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private tenantService: TenantService
  ) {
    super(router);
    this.createForm();

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
      this.showAlertErrorFields();
      return;
    }

    let tenant: TenantModel =  new TenantModel();
    tenant = this.frmTenant.value;
    
    if (this.editAction) {
      tenant.tenantId = this.tenantId;
      this.tenantService.update(tenant).subscribe((res: any) => {        
        this.validateRequestCreated(res,'/Tenants/tenant');   
      },
      (err) => {
        // Error        
        this.showAlertGeneralError(err);        
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.tenantService.create(tenant).subscribe((res: any) => {        
        this.validateRequestCreated(res,'/Tenants/tenant');
      },
      (err) => {
        // Error        
       this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

  }

 
  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmTenant.controls; }

}
