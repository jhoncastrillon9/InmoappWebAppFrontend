import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { BankAccountService } from 'src/app/services/Banks/bank-account.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss'],
})

export class BankAccountFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmBankAccount: FormGroup;

  // validation form
  validation = false;
  
  // BankAccount Model
  bankAccount = new BankAccountModel();
  bankAccountId = 0;
  bankAccountActive = true;
  companyList: any[] = [];

  // Filter
  bankAccountFilter = new BankAccountModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private bankAccountService: BankAccountService
  ) {
    super(router);
    this.createForm();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.bankAccountId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmBankAccount = this.formBuilder.group({
      bankAccountName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      total: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')])     
    });
  }


  // Set data
  initForm(): void {
    this.bankAccountService.get(this.bankAccountId).subscribe((res: any) => {
      this.bankAccount = res.data[0];

      this.frmBankAccount.get('bankAccountName').setValue(this.bankAccount.bankAccountName);
      this.frmBankAccount.get('total').setValue(this.bankAccount.total); 
      // Enable disable form
      
      if (this.bankAccountActive) {
        this.frmBankAccount.enable();
      }
      else {
        this.frmBankAccount.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmBankAccount.valid) {
      // Set true validation
      this.validation = true;
    
      this.showAlertErrorFields();
      return;
    }

    let bankAccount: BankAccountModel =  new BankAccountModel();
    bankAccount = this.frmBankAccount.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      bankAccount.bankAccountId = this.bankAccountId;
      this.bankAccountService.update(bankAccount).subscribe((res: any) => {
        this.validateRequestEdit(res,'/Banks/bankAccount');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.bankAccountService.create(bankAccount).subscribe((res: any) => {
        this.validateRequestCreated(res,'/Banks/bankAccount');
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
  get f() { return this.frmBankAccount.controls; }

}
