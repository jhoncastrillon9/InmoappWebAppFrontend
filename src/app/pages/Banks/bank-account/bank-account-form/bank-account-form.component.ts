import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { BankAccountService } from 'src/app/services/Banks/bank-account.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss'],
})

export class BankAccountFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmBankAccount: FormGroup;

  // validation form
  validation = false;
  
  // BankAccount Model
  bankAccount = new BankAccountModel();
  bankAccountId = 0;
  bankAccountActive = true;
  companyList: any[] = [];

  // Filter
  bankAccountFilter = new BankAccountModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private bankAccountService: BankAccountService
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
        this.bankAccountId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmBankAccount = this.formBuilder.group({
      bankAccountName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      total: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.bankAccountService.get(this.bankAccountId).subscribe((res: any) => {
      this.bankAccount = res.data[0];

      this.frmBankAccount.get('bankAccountName').setValue(this.bankAccount.bankAccountName);
      this.frmBankAccount.get('total').setValue(this.bankAccount.total);
      this.frmBankAccount.get('compayId').setValue(this.bankAccount.compayId);



      // Enable disable form
      
      if (this.bankAccountActive) {
        this.frmBankAccount.enable();
      }
      else {
        this.frmBankAccount.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmBankAccount.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let bankAccount: BankAccountModel =  new BankAccountModel();
    bankAccount = this.frmBankAccount.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      bankAccount.bankAccountId = this.bankAccountId;
      this.bankAccountService.update(bankAccount).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/bankAccount']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.bankAccountService.create(bankAccount).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/bankAccount']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
      },
      () => {
        // Complete
      });
    }

  }


  changeStatus(status: boolean, bankAccount: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${bankAccount.bankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.bankAccountService.enable(bankAccount.bankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
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
        <br> <strong>Registro # ${bankAccount.bankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.bankAccountService.disable(bankAccount.bankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
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
  get f() { return this.frmBankAccount.controls; }

}
