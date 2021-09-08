import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ContractsStatusModel } from 'src/app/models/Contracts/contracts-status.model';

import { ContractsStatusService } from 'src/app/services/Contracts/contracts-status.service';

@Component({
  selector: 'app-contracts-status-form',
  templateUrl: './contracts-status-form.component.html',
  styleUrls: ['./contracts-status-form.component.scss'],
})

export class ContractsStatusFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmContractsStatus: FormGroup;

  // validation form
  validation = false;
  
  // ContractsStatus Model
  contractsStatus = new ContractsStatusModel();
  contractsStatusId = 0;
  contractsStatusActive = true;

  // Filter
  contractsStatusFilter = new ContractsStatusModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

    private contractsStatusService: ContractsStatusService
  ) {
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.contractsStatusId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmContractsStatus = this.formBuilder.group({
      contractsStatusName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.contractsStatusService.get(this.contractsStatusId).subscribe((res: any) => {
      this.contractsStatus = res.data[0];

      this.frmContractsStatus.get('contractsStatusName').setValue(this.contractsStatus.contractsStatusName);



      // Enable disable form
      
      if (this.contractsStatusActive) {
        this.frmContractsStatus.enable();
      }
      else {
        this.frmContractsStatus.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmContractsStatus.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let contractsStatus: ContractsStatusModel =  new ContractsStatusModel();
    contractsStatus = this.frmContractsStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      contractsStatus.contractsStatusId = this.contractsStatusId;
      this.contractsStatusService.update(contractsStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Contracts/contractsStatus']);
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
      this.contractsStatusService.create(contractsStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Contracts/contractsStatus']);
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


  changeStatus(status: boolean, contractsStatus: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${contractsStatus.contractsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.contractsStatusService.enable(contractsStatus.contractsStatusId).subscribe((res: any) => {
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
        <br> <strong>Record # ${contractsStatus.contractsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.contractsStatusService.disable(contractsStatus.contractsStatusId).subscribe((res: any) => {
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
  get f() { return this.frmContractsStatus.controls; }

}
