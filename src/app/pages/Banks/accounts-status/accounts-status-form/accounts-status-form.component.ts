import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';

import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-accounts-status-form',
  templateUrl: './accounts-status-form.component.html',
  styleUrls: ['./accounts-status-form.component.scss'],
})

export class AccountsStatusFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmAccountsStatus: FormGroup;

  // validation form
  validation = false;

  // AccountsStatus Model
  accountsStatus = new AccountsStatusModel();
  accountsStatusId = 0;
  accountsStatusActive = true;

  // Filter
  accountsStatusFilter = new AccountsStatusModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private accountsStatusService: AccountsStatusService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.accountsStatusId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmAccountsStatus = this.formBuilder.group({
      accountsStatusName: new FormControl(null, [Validators.maxLength(50)]),

    });
  }


  // Set data
  initForm(): void {
    this.accountsStatusService.get(this.accountsStatusId).subscribe((res: any) => {
      this.accountsStatus = res.data[0];

      this.frmAccountsStatus.get('accountsStatusName').setValue(this.accountsStatus.accountsStatusName);



      // Enable disable form

      if (this.accountsStatusActive) {
        this.frmAccountsStatus.enable();
      }
      else {
        this.frmAccountsStatus.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmAccountsStatus.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let accountsStatus: AccountsStatusModel = new AccountsStatusModel();
    accountsStatus = this.frmAccountsStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsStatus.accountsStatusId = this.accountsStatusId;
      this.accountsStatusService.update(accountsStatus).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Banks/accountsStatus');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.accountsStatusService.create(accountsStatus).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Banks/accountsStatus');
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
  get f() { return this.frmAccountsStatus.controls; }

}
