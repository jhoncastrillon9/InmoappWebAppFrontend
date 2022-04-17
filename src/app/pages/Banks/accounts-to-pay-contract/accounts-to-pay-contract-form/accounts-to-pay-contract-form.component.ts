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
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-accounts-to-pay-contract-form',
  templateUrl: './accounts-to-pay-contract-form.component.html',
  styleUrls: ['./accounts-to-pay-contract-form.component.scss'],
})

export class AccountsToPayContractFormComponent extends BaseCommonsComponent {
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
    public router: Router,
    private formBuilder: FormBuilder,
    private accountsStatusService: AccountsStatusService,
    private contractService: ContractService,
    private companyService: CompanyService,

    private accountsToPayContractService: AccountsToPayContractService
  ) {
    super(router);
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

      this.showAlertErrorFields();
      return;
    }

    let accountsToPayContract: AccountsToPayContractModel = new AccountsToPayContractModel();
    accountsToPayContract = this.frmAccountsToPayContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsToPayContract.accountsToPayContractId = this.accountsToPayContractId;
      this.accountsToPayContractService.update(accountsToPayContract).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Banks/accountsToPayContract');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.accountsToPayContractService.create(accountsToPayContract).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Banks/accountsToPayContract');
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
  get f() { return this.frmAccountsToPayContract.controls; }

}
