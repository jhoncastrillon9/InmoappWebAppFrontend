import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { TenantsByContractModel } from 'src/app/models/Contracts/tenants-by-contract.model';
import { TenantsByContractService } from 'src/app/services/Contracts/tenants-by-contract.service';

import { TenantModel } from 'src/app/models/Tenants/tenant.model';

import { TenantService } from 'src/app/services/Tenants/tenant.service';


@Component({
  selector: 'app-tenants-by-contract-list',
  templateUrl: './tenants-by-contract-list.component.html',
  styleUrls: ['./tenants-by-contract-list.component.scss']
})

export class TenantsByContractListComponent implements OnInit {

  // load TenantsByContracts
  tenantsByContracts: any[] = [];
  tenantsByContract: TenantsByContractModel;

  // Filter
  frmFilter: FormGroup;
  tenantsByContractFilter = new TenantsByContractModel();
  showFiller = false;
  tenantList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private tenantsByContractService: TenantsByContractService,
    private cd: ChangeDetectorRef,
        private tenantService: TenantService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.tenantService.getList(new TenantModel()).subscribe((res: any) => {
      this.tenantList = res.data;
    });

  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      tenantsByContractId: new FormControl(null),
      tenantId: new FormControl(null),
      profile: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.tenantsByContracts = [];

    this.tenantsByContractService.getAll(this.tenantsByContractFilter).subscribe(
      (res: any) => {
        this.tenantsByContracts = res.data;
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


  changeStatus(status: boolean, tenantsByContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${tenantsByContract.tenantsByContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.tenantsByContractService.enable(tenantsByContract.tenantsByContractId).subscribe((res: any) => {
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
        <br> <strong>Record # ${tenantsByContract.tenantsByContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.tenantsByContractService.disable(tenantsByContract.tenantsByContractId).subscribe((res: any) => {
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


  delete(tenantsByContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to <strong><u>delete permanently</u></strong> this record?</h4>  <br>
        <strong>Record # ${tenantsByContract.tenantsByContractId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.tenantsByContractService.delete(tenantsByContract.tenantsByContractId).subscribe((res: any) => {
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
    this.tenantsByContractFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.tenantsByContractFilter = new TenantsByContractModel();
    this.frmFilter.reset();
    this.load();
  }




}






