import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HistoryBankAccountModel } from 'src/app/models/Banks/history-bank-account.model';
import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { AccountsToPayContractModel } from 'src/app/models/Banks/accounts-to-pay-contract.model';
import { AccountsToReceivableContractModel } from 'src/app/models/Banks/accounts-to-receivable-contract.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { HistoryBankAccountService } from 'src/app/services/Banks/history-bank-account.service';
import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';
import { BankAccountService } from 'src/app/services/Banks/bank-account.service';
import { AccountsToPayContractService } from 'src/app/services/Banks/accounts-to-pay-contract.service';
import { AccountsToReceivableContractService } from 'src/app/services/Banks/accounts-to-receivable-contract.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';

@Component({
  selector: 'app-history-bank-account-form',
  templateUrl: './history-bank-account-form.component.html',
  styleUrls: ['./history-bank-account-form.component.scss'],
})

export class HistoryBankAccountFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmHistoryBankAccount: FormGroup;

  // validation form
  validation = false;
  
  // HistoryBankAccount Model
  historyBankAccount = new HistoryBankAccountModel();
  historyBankAccountId = 0;
  historyBankAccountActive = true;
  paymentTypeList: any[] = [];
  bankAccountList: any[] = [];
  accountsToPayContractList: any[] = [];
  accountsToReceivableContractList: any[] = [];
  companyList: any[] = [];

  // Filter
  historyBankAccountFilter = new HistoryBankAccountModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private paymentTypeService: PaymentTypeService,
    private bankAccountService: BankAccountService,
    private accountsToPayContractService: AccountsToPayContractService,
    private accountsToReceivableContractService: AccountsToReceivableContractService,
    private companyService: CompanyService,

    private historyBankAccountService: HistoryBankAccountService
  ) {
    this.createForm();
    this.paymentTypeService.getList(new PaymentTypeModel()).subscribe((res: any) => {
      this.paymentTypeList = res.data;
    });

    this.bankAccountService.getList(new BankAccountModel()).subscribe((res: any) => {
      this.bankAccountList = res.data;
    });

    this.accountsToPayContractService.getList(new AccountsToPayContractModel()).subscribe((res: any) => {
      this.accountsToPayContractList = res.data;
    });

    this.accountsToReceivableContractService.getList(new AccountsToReceivableContractModel()).subscribe((res: any) => {
      this.accountsToReceivableContractList = res.data;
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
        this.historyBankAccountId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmHistoryBankAccount = this.formBuilder.group({
      paymentTypeId: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      bankAccountId: new FormControl(null, [Validators.required]),
      accountsToPayContractsId: new FormControl(null),
      accountsToReceivableContractsId: new FormControl(null),
      obervation: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.historyBankAccountService.get(this.historyBankAccountId).subscribe((res: any) => {
      this.historyBankAccount = res.data[0];

      this.frmHistoryBankAccount.get('paymentTypeId').setValue(this.historyBankAccount.paymentTypeId);
      this.frmHistoryBankAccount.get('value').setValue(this.historyBankAccount.value);
      this.frmHistoryBankAccount.get('bankAccountId').setValue(this.historyBankAccount.bankAccountId);
      this.frmHistoryBankAccount.get('accountsToPayContractsId').setValue(this.historyBankAccount.accountsToPayContractsId);
      this.frmHistoryBankAccount.get('accountsToReceivableContractsId').setValue(this.historyBankAccount.accountsToReceivableContractsId);
      this.frmHistoryBankAccount.get('obervation').setValue(this.historyBankAccount.obervation);
      this.frmHistoryBankAccount.get('compayId').setValue(this.historyBankAccount.compayId);



      // Enable disable form
      
      if (this.historyBankAccountActive) {
        this.frmHistoryBankAccount.enable();
      }
      else {
        this.frmHistoryBankAccount.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmHistoryBankAccount.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let historyBankAccount: HistoryBankAccountModel =  new HistoryBankAccountModel();
    historyBankAccount = this.frmHistoryBankAccount.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      historyBankAccount.historyBankAccountId = this.historyBankAccountId;
      this.historyBankAccountService.update(historyBankAccount).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/historyBankAccount']);
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
      this.historyBankAccountService.create(historyBankAccount).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Banks/historyBankAccount']);
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


  changeStatus(status: boolean, historyBankAccount: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${historyBankAccount.historyBankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.historyBankAccountService.enable(historyBankAccount.historyBankAccountId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${historyBankAccount.historyBankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.historyBankAccountService.disable(historyBankAccount.historyBankAccountId).subscribe((res: any) => {
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
  get f() { return this.frmHistoryBankAccount.controls; }

}
