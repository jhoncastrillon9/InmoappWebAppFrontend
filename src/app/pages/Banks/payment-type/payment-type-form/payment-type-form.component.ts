import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-payment-type-form',
  templateUrl: './payment-type-form.component.html',
  styleUrls: ['./payment-type-form.component.scss'],
})

export class PaymentTypeFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmPaymentType: FormGroup;

  // validation form
  validation = false;
  
  // PaymentType Model
  paymentType = new PaymentTypeModel();
  paymentTypeId = 0;
  paymentTypeActive = true;
  companyList: any[] = [];

  // Filter
  paymentTypeFilter = new PaymentTypeModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private paymentTypeService: PaymentTypeService
  ) {
    super(router);
    this.createForm();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.paymentTypeId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPaymentType = this.formBuilder.group({
      paymentTypeName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
         });
  }


  // Set data
  initForm(): void {
    this.paymentTypeService.get(this.paymentTypeId).subscribe((res: any) => {
      this.paymentType = res.data[0];

      this.frmPaymentType.get('paymentTypeName').setValue(this.paymentType.paymentTypeName);
      


      // Enable disable form
      
      if (this.paymentTypeActive) {
        this.frmPaymentType.enable();
      }
      else {
        this.frmPaymentType.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmPaymentType.valid) {
      // Set true validation
      this.validation = true;
    
this.showAlertErrorFields();
      return;
    }

    let paymentType: PaymentTypeModel =  new PaymentTypeModel();
    paymentType = this.frmPaymentType.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      paymentType.paymentTypeId = this.paymentTypeId;
      this.paymentTypeService.update(paymentType).subscribe((res: any) => {
        this.validateRequestEdit(res,'/Banks/paymentType');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.paymentTypeService.create(paymentType).subscribe((res: any) => {
        this.validateRequestCreated(res,'/Banks/paymentType');
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
  get f() { return this.frmPaymentType.controls; }

}
