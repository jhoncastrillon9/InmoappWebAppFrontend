import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { BankAccountService } from 'src/app/services/Banks/bank-account.service';

import { CompanyModel } from 'src/app/models/Companies/company.model';

import { CompanyService } from 'src/app/services/Companies/company.service';


@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss']
})

export class BankAccountListComponent implements OnInit {

  // load BankAccounts
  bankAccounts: any[] = [];
  bankAccount: BankAccountModel;

  // Filter
  frmFilter: FormGroup;
  bankAccountFilter = new BankAccountModel();
  showFiller = false;
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private bankAccountService: BankAccountService,
    private cd: ChangeDetectorRef,
        private companyService: CompanyService,

    private formBuilder: FormBuilder) {
    this.createForm();

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
      bankAccountId: new FormControl(null),
      bankAccountName: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.bankAccounts = [];

    this.bankAccountService.getAll(this.bankAccountFilter).subscribe(
      (res: any) => {
        this.bankAccounts = res.data;
      },
      (err) => { 
        //console.log(err);
        Swal.fire('Error', 'Unexpected error', 'error');
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


  changeStatus(status: boolean, bankAccount: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${bankAccount.bankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.bankAccountService.enable(bankAccount.bankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record enabled', 'success').then(() => {
              this.load();
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
        <br> <strong>Record # ${bankAccount.bankAccountId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.bankAccountService.disable(bankAccount.bankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record disabled', 'success').then(() => {
              this.load();
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


  delete(bankAccount: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to <strong><u>delete permanently</u></strong> this record?</h4>  <br>
        <strong>Record # ${bankAccount.bankAccountId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.bankAccountService.delete(bankAccount.bankAccountId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Delete', 'Record deleted', 'success').then(() => {
              this.load();
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


  // Searh register
  searchList(): void {
    this.bankAccountFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.bankAccountFilter = new BankAccountModel();
    this.frmFilter.reset();
    this.load();
  }




}






