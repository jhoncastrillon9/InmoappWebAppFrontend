import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';

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

      console.table(this.companyList);
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
        '¡Ups!',
        'Por favor completa los campos requeridos',
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
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/paymentType']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.paymentTypeService.create(paymentType).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/paymentType']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.enable(paymentType.paymentTypeId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
        html: `<h4>¿Estas seguro de desactivar este registro?</h4>
        <br> <strong>Registro # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.disable(paymentType.paymentTypeId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
