import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { ContractService } from 'src/app/services/Contracts/contract.service';

import { ContractsStatusModel } from 'src/app/models/Contracts/contracts-status.model';
import { PropertyModel } from 'src/app/models/Properties/property.model';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { ContractsStatusService } from 'src/app/services/Contracts/contracts-status.service';
import { PropertyService } from 'src/app/services/Properties/property.service';
import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { CompanyService } from 'src/app/services/Companies/company.service';


@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})

export class ContractListComponent implements OnInit {

  // load Contracts
  contracts: any[] = [];
  contract: ContractModel;

  // Filter
  frmFilter: FormGroup;
  contractFilter = new ContractModel();
  showFiller = false;
  contractsStatusList: any[] = [];
  propertyList: any[] = [];
  tenantList: any[] = [];
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private contractService: ContractService,
    private cd: ChangeDetectorRef,
        private contractsStatusService: ContractsStatusService,
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private companyService: CompanyService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.contractsStatusService.getList(new ContractsStatusModel()).subscribe((res: any) => {
      this.contractsStatusList = res.data;
    });
    this.propertyService.getList(new PropertyModel()).subscribe((res: any) => {
      this.propertyList = res.data;
    });
    this.tenantService.getList(new TenantModel()).subscribe((res: any) => {
      this.tenantList = res.data;
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
      contractId: new FormControl(null),
      observation: new FormControl(null),
      statusId: new FormControl(null),
      propertyId: new FormControl(null),
      tenantId: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.contracts = [];

    this.contractService.getAll(this.contractFilter).subscribe(
      (res: any) => {
        this.contracts = res.data;
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


  changeStatus(status: boolean, contract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${contract.contractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.contractService.enable(contract.contractId).subscribe((res: any) => {
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
        <br> <strong>Record # ${contract.contractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.contractService.disable(contract.contractId).subscribe((res: any) => {
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


  delete(contract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to <strong><u>delete permanently</u></strong> this record?</h4>  <br>
        <strong>Record # ${contract.contractId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.contractService.delete(contract.contractId).subscribe((res: any) => {
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
    this.contractFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.contractFilter = new ContractModel();
    this.frmFilter.reset();
    this.load();
  }




}






