import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-payment-type-form',
  templateUrl: './payment-type-form.component.html',
  styleUrls: ['./payment-type-form.component.scss'],
})

export class PaymentTypeFormComponent implements OnInit {
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
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private paymentTypeService: PaymentTypeService
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
        this.paymentTypeId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPaymentType = this.formBuilder.group({
      paymentTypeName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.paymentTypeService.get(this.paymentTypeId).subscribe((res: any) => {
      this.paymentType = res.data[0];

      this.frmPaymentType.get('paymentTypeName').setValue(this.paymentType.paymentTypeName);
      this.frmPaymentType.get('compayId').setValue(this.paymentType.compayId);



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
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let paymentType: PaymentTypeModel =  new PaymentTypeModel();
    paymentType = this.frmPaymentType.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      paymentType.paymentTypeId = this.paymentTypeId;
      this.paymentTypeService.update(paymentType).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Banks/paymentType']);
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
      this.paymentTypeService.create(paymentType).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Banks/paymentType']);
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


  changeStatus(status: boolean, paymentType: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.enable(paymentType.paymentTypeId).subscribe((res: any) => {
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
        <br> <strong>Record # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.disable(paymentType.paymentTypeId).subscribe((res: any) => {
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
  get f() { return this.frmPaymentType.controls; }

}
