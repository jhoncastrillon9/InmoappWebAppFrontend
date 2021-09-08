import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';

import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';

@Component({
  selector: 'app-accounts-status-form',
  templateUrl: './accounts-status-form.component.html',
  styleUrls: ['./accounts-status-form.component.scss'],
})

export class AccountsStatusFormComponent implements OnInit {
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
    private router: Router,
    private formBuilder: FormBuilder,

    private accountsStatusService: AccountsStatusService
  ) {
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
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let accountsStatus: AccountsStatusModel =  new AccountsStatusModel();
    accountsStatus = this.frmAccountsStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      accountsStatus.accountsStatusId = this.accountsStatusId;
      this.accountsStatusService.update(accountsStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Banks/accountsStatus']);
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

    if (!this.editAction){
      this.accountsStatusService.create(accountsStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Banks/accountsStatus']);
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

  }


  changeStatus(status: boolean, accountsStatus: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${accountsStatus.accountsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.accountsStatusService.enable(accountsStatus.accountsStatusId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record enabled', 'success').then(() => {
              this.initForm();
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
        <br> <strong>Record # ${accountsStatus.accountsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.accountsStatusService.disable(accountsStatus.accountsStatusId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record disabled', 'success').then(() => {
              this.initForm();
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

 
  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmAccountsStatus.controls; }

}