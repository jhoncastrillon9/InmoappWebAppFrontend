import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AccountsToPayContractModel } from 'src/app/models/Banks/accounts-to-pay-contract.model';
import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';
import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { AccountsToPayContractService } from 'src/app/services/Banks/accounts-to-pay-contract.service';
import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';
import { ContractService } from 'src/app/services/Contracts/contract.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-accounts-to-pay-contract-form',
  templateUrl: './accounts-to-pay-contract-form.component.html',
  styleUrls: ['./accounts-to-pay-contract-form.component.scss'],
})

export class AccountsToPayContractFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmAccountsToPayContract: FormGroup;

  // validation form
  validation = false;
  
  // AccountsToPayContract Model
  accountsToPayContract = new AccountsToPayContractModel();
  accountsToPayContractId = 0;
  accountsToPayContractActive = true;
  accountsStatusList: any[] = [];
  contractList: any[] = [];
  companyList: any[] = [];

  // Filter
  accountsToPayContractFilter = new AccountsToPayContractModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountsStatusService: AccountsStatusService,
    private contractService: ContractService,
    private companyService: CompanyService,

    private accountsToPayContractService: AccountsToPayContractService
  ) {
    this.createForm();
    this.accountsStatusService.getList(new AccountsStatusModel()).subscribe((res: any) => {
      this.accountsStatusList = res.data;
    });

    this.contractService.getList(new ContractModel()).subscribe((res: any) => {
      this.contractList = res.data;
    });

    this.companyService.getList(new CompanyModel()).subscribe((res: any) => {
      this.companyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.accountsToPayContractId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmAccountsToPayContract = this.formBuilder.group({
      quotaNumber: new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9]*$'), Validators.min(-2147483648), Validators.max(2147483647)]),
      value: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      expirationDate: new FormControl(null, [Validators.required]),
      accountsStatusId: new FormControl(null),
      contractId: new FormControl(null, [Validators.required]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.accountsToPayContractService.get(this.accountsToPayContractId).subscribe((res: any) => {
      this.accountsToPayContract = res.data[0];

      this.frmAccountsToPayContract.get('quotaNumber').setValue(this.accountsToPayContract.quotaNumber);
      this.frmAccountsToPayContract.get('value').setValue(this.accountsToPayContract.value);
      this.frmAccountsToPayContract.get('expirationDate').setValue(this.accountsToPayContract.expirationDate);
      this.frmAccountsToPayContract.get('accountsStatusId').setValue(this.accountsToPayContract.accountsStatusId);
      this.frmAccountsToPayContract.get('contractId').setValue(this.accountsToPayContract.contractId);
      this.frmAccountsToPayContract.get('compayId').setValue(this.accountsToPayContract.compayId);



      // Enable disable form
      
      if (this.accountsToPayContractActive) {
        this.frmAccountsToPayContract.enable();
      }
      else {
        this.frmAccountsToPayContract.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmAccountsToPayContract.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let accountsToPayContract: AccountsToPayContractModel =  new AccountsToPayContractModel();
    accountsToPayContract = this.frmAccountsToPayContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsToPayContract.accountsToPayContractId = this.accountsToPayContractId;
      this.accountsToPayContractService.update(accountsToPayContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/accountsToPayContract']);
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
      this.accountsToPayContractService.create(accountsToPayContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/accountsToPayContract']);
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


  changeStatus(status: boolean, accountsToPayContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${accountsToPayContract.accountsToPayContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsToPayContractService.enable(accountsToPayContract.accountsToPayContractId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${accountsToPayContract.accountsToPayContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsToPayContractService.disable(accountsToPayContract.accountsToPayContractId).subscribe((res: any) => {
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
  get f() { return this.frmAccountsToPayContract.controls; }

}
