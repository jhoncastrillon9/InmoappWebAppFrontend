import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { HistoryBankAccountModel } from 'src/app/models/Banks/history-bank-account.model';
import { HistoryBankAccountService } from 'src/app/services/Banks/history-bank-account.service';

import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { AccountsToPayContractModel } from 'src/app/models/Banks/accounts-to-pay-contract.model';
import { AccountsToReceivableContractModel } from 'src/app/models/Banks/accounts-to-receivable-contract.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';
import { BankAccountService } from 'src/app/services/Banks/bank-account.service';
import { AccountsToPayContractService } from 'src/app/services/Banks/accounts-to-pay-contract.service';
import { AccountsToReceivableContractService } from 'src/app/services/Banks/accounts-to-receivable-contract.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';


@Component({
  selector: 'app-history-bank-account-list',
  templateUrl: './history-bank-account-list.component.html',
  styleUrls: ['./history-bank-account-list.component.scss']
})

export class HistoryBankAccountListComponent implements OnInit {

  // load HistoryBankAccounts
  historyBankAccounts: any[] = [];
  historyBankAccount: HistoryBankAccountModel;

  // Filter
  frmFilter: FormGroup;
  historyBankAccountFilter = new HistoryBankAccountModel();
  showFiller = false;
  paymentTypeList: any[] = [];
  bankAccountList: any[] = [];
  accountsToPayContractList: any[] = [];
  accountsToReceivableContractList: any[] = [];
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private historyBankAccountService: HistoryBankAccountService,
    private cd: ChangeDetectorRef,
        private paymentTypeService: PaymentTypeService,
    private bankAccountService: BankAccountService,
    private accountsToPayContractService: AccountsToPayContractService,
    private accountsToReceivableContractService: AccountsToReceivableContractService,
    private companyService: CompanyService,

    private formBuilder: FormBuilder) {
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
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      historyBankAccountId: new FormControl(null),
      paymentTypeId: new FormControl(null),
      bankAccountId: new FormControl(null),
      accountsToPayContractsId: new FormControl(null),
      accountsToReceivableContractsId: new FormControl(null),
      obervation: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.historyBankAccounts = [];

    this.historyBankAccountService.getAll(this.historyBankAccountFilter).subscribe(
      (res: any) => {
        this.historyBankAccounts = res.data;
      },
      (err) => { 
        //console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
      },
      () => {
        this.showLoading = false;
      }
    );
  }


  // Filter sidebar
  openFilter(status: boolean): void {
    this.showFiller = status;
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
              this.load();
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
              this.load();
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


  delete(historyBankAccount: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${historyBankAccount.historyBankAccountId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.historyBankAccountService.delete(historyBankAccount.historyBankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Delete', 'Record deleted', 'success').then(() => {
              this.load();
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


  // Searh register
  searchList(): void {
    this.historyBankAccountFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.historyBankAccountFilter = new HistoryBankAccountModel();
    this.frmFilter.reset();
    this.load();
  }




}






