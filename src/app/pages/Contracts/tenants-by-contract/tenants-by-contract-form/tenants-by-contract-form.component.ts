import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TenantsByContractModel } from 'src/app/models/Contracts/tenants-by-contract.model';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';

import { TenantsByContractService } from 'src/app/services/Contracts/tenants-by-contract.service';
import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-tenants-by-contract-form',
  templateUrl: './tenants-by-contract-form.component.html',
  styleUrls: ['./tenants-by-contract-form.component.scss'],
})

export class TenantsByContractFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmTenantsByContract: FormGroup;

  // validation form
  validation = false;

  // TenantsByContract Model
  tenantsByContract = new TenantsByContractModel();
  tenantsByContractId = 0;
  tenantsByContractActive = true;
  tenantList: any[] = [];

  // Filter
  tenantsByContractFilter = new TenantsByContractModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private tenantService: TenantService,

    private tenantsByContractService: TenantsByContractService
  ) {
    super(router);
    this.createForm();
    this.tenantService.getList(new TenantModel()).subscribe((res: any) => {
      this.tenantList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.tenantsByContractId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmTenantsByContract = this.formBuilder.group({
      tenantId: new FormControl(null, [Validators.required]),
      profile: new FormControl(null, [Validators.maxLength(300)]),

    });
  }


  // Set data
  initForm(): void {
    this.tenantsByContractService.get(this.tenantsByContractId).subscribe((res: any) => {
      this.tenantsByContract = res.data[0];

      this.frmTenantsByContract.get('tenantId').setValue(this.tenantsByContract.tenantId);
      this.frmTenantsByContract.get('profile').setValue(this.tenantsByContract.profile);



      // Enable disable form

      if (this.tenantsByContractActive) {
        this.frmTenantsByContract.enable();
      }
      else {
        this.frmTenantsByContract.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmTenantsByContract.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let tenantsByContract: TenantsByContractModel = new TenantsByContractModel();
    tenantsByContract = this.frmTenantsByContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      tenantsByContract.tenantsByContractId = this.tenantsByContractId;
      this.tenantsByContractService.update(tenantsByContract).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Contracts/tenantsByContract');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.tenantsByContractService.create(tenantsByContract).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Contracts/tenantsByContract');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmTenantsByContract.controls; }

}
