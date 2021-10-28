import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AccountsToReceivableContractModel } from 'src/app/models/Banks/accounts-to-receivable-contract.model';
import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';
import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { AccountsToReceivableContractService } from 'src/app/services/Banks/accounts-to-receivable-contract.service';
import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';
import { ContractService } from 'src/app/services/Contracts/contract.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-accounts-to-receivable-contract-form',
  templateUrl: './accounts-to-receivable-contract-form.component.html',
  styleUrls: ['./accounts-to-receivable-contract-form.component.scss'],
})

export class AccountsToReceivableContractFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmAccountsToReceivableContract: FormGroup;

  // validation form
  validation = false;
  
  // AccountsToReceivableContract Model
  accountsToReceivableContract = new AccountsToReceivableContractModel();
  accountsToReceivableContractId = 0;
  accountsToReceivableContractActive = true;
  accountsStatusList: any[] = [];
  contractList: any[] = [];
  companyList: any[] = [];

  // Filter
  accountsToReceivableContractFilter = new AccountsToReceivableContractModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountsStatusService: AccountsStatusService,
    private contractService: ContractService,
    private companyService: CompanyService,

    private accountsToReceivableContractService: AccountsToReceivableContractService
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
        this.accountsToReceivableContractId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmAccountsToReceivableContract = this.formBuilder.group({
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
    this.accountsToReceivableContractService.get(this.accountsToReceivableContractId).subscribe((res: any) => {
      this.accountsToReceivableContract = res.data[0];

      this.frmAccountsToReceivableContract.get('quotaNumber').setValue(this.accountsToReceivableContract.quotaNumber);
      this.frmAccountsToReceivableContract.get('value').setValue(this.accountsToReceivableContract.value);
      this.frmAccountsToReceivableContract.get('expirationDate').setValue(this.accountsToReceivableContract.expirationDate);
      this.frmAccountsToReceivableContract.get('accountsStatusId').setValue(this.accountsToReceivableContract.accountsStatusId);
      this.frmAccountsToReceivableContract.get('contractId').setValue(this.accountsToReceivableContract.contractId);
      this.frmAccountsToReceivableContract.get('compayId').setValue(this.accountsToReceivableContract.compayId);



      // Enable disable form
      
      if (this.accountsToReceivableContractActive) {
        this.frmAccountsToReceivableContract.enable();
      }
      else {
        this.frmAccountsToReceivableContract.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmAccountsToReceivableContract.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor complete los campos requeridos',
        'error'
      );
      return;
    }

    let accountsToReceivableContract: AccountsToReceivableContractModel =  new AccountsToReceivableContractModel();
    accountsToReceivableContract = this.frmAccountsToReceivableContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsToReceivableContract.accountsToReceivableContractId = this.accountsToReceivableContractId;
      this.accountsToReceivableContractService.update(accountsToReceivableContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/accountsToReceivableContract']);
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
      this.accountsToReceivableContractService.create(accountsToReceivableContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/accountsToReceivableContract']);
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


  changeStatus(status: boolean, accountsToReceivableContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${accountsToReceivableContract.accountsToReceivableContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsToReceivableContractService.enable(accountsToReceivableContract.accountsToReceivableContractId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${accountsToReceivableContract.accountsToReceivableContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsToReceivableContractService.disable(accountsToReceivableContract.accountsToReceivableContractId).subscribe((res: any) => {
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
  get f() { return this.frmAccountsToReceivableContract.controls; }

}
