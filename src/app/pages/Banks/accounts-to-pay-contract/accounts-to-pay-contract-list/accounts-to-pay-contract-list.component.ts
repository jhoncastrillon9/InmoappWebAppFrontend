import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { AccountsToPayContractModel } from 'src/app/models/Banks/accounts-to-pay-contract.model';
import { AccountsToPayContractService } from 'src/app/services/Banks/accounts-to-pay-contract.service';

import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';
import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';
import { ContractService } from 'src/app/services/Contracts/contract.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';


@Component({
  selector: 'app-accounts-to-pay-contract-list',
  templateUrl: './accounts-to-pay-contract-list.component.html',
  styleUrls: ['./accounts-to-pay-contract-list.component.scss']
})

export class AccountsToPayContractListComponent implements OnInit {

  // load AccountsToPayContracts
  accountsToPayContracts: any[] = [];
  accountsToPayContract: AccountsToPayContractModel;

  // Filter
  frmFilter: FormGroup;
  accountsToPayContractFilter = new AccountsToPayContractModel();
  showFiller = false;
  accountsStatusList: any[] = [];
  contractList: any[] = [];
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private accountsToPayContractService: AccountsToPayContractService,
    private cd: ChangeDetectorRef,
        private accountsStatusService: AccountsStatusService,
    private contractService: ContractService,
    private companyService: CompanyService,

    private formBuilder: FormBuilder) {
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
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      accountsToPayContractId: new FormControl(null),
      accountsStatusId: new FormControl(null),
      contractId: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.accountsToPayContracts = [];

    this.accountsToPayContractService.getAll(this.accountsToPayContractFilter).subscribe(
      (res: any) => {
        this.accountsToPayContracts = res.data;
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


  delete(accountsToPayContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${accountsToPayContract.accountsToPayContractId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsToPayContractService.delete(accountsToPayContract.accountsToPayContractId).subscribe((res: any) => {
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
    this.accountsToPayContractFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.accountsToPayContractFilter = new AccountsToPayContractModel();
    this.frmFilter.reset();
    this.load();
  }




}






