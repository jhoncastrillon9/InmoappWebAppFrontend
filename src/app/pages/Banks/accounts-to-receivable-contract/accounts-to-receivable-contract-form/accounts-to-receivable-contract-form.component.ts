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
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-accounts-to-receivable-contract-form',
  templateUrl: './accounts-to-receivable-contract-form.component.html',
  styleUrls: ['./accounts-to-receivable-contract-form.component.scss'],
})

export class AccountsToReceivableContractFormComponent extends BaseCommonsComponent {
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
    public router: Router,
    private formBuilder: FormBuilder,
    private accountsStatusService: AccountsStatusService,
    private contractService: ContractService,
    private companyService: CompanyService,

    private accountsToReceivableContractService: AccountsToReceivableContractService
  ) {
    super(router);
    this.createForm();
    this.accountsStatusService.getList(new AccountsStatusModel()).subscribe((res: any) => {
      this.accountsStatusList = res.data;
    });

    this.contractService.getList(new ContractModel()).subscribe((res: any) => {
      this.contractList = res.data;
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
    
this.showAlertErrorFields();
      return;
    }

    let accountsToReceivableContract: AccountsToReceivableContractModel =  new AccountsToReceivableContractModel();
    accountsToReceivableContract = this.frmAccountsToReceivableContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsToReceivableContract.accountsToReceivableContractId = this.accountsToReceivableContractId;
      this.accountsToReceivableContractService.update(accountsToReceivableContract).subscribe((res: any) => {
        this.validateRequestEdit(res,'/Banks/accountsToReceivableContract');
      },
      (err) => {
this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.accountsToReceivableContractService.create(accountsToReceivableContract).subscribe((res: any) => {
        this.validateRequestCreated(res,'/Banks/accountsToReceivableContract'); 
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

  }

 
  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmAccountsToReceivableContract.controls; }

}
