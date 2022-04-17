import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContractsStatusModel } from 'src/app/models/Contracts/contracts-status.model';
import { ContractsStatusService } from 'src/app/services/Contracts/contracts-status.service';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-contracts-status-form',
  templateUrl: './contracts-status-form.component.html',
  styleUrls: ['./contracts-status-form.component.scss'],
})

export class ContractsStatusFormComponent extends BaseCommonsComponent {
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
    public router: Router,
    private formBuilder: FormBuilder,

    private contractsStatusService: ContractsStatusService
  ) {
    super(router);
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

      this.showAlertErrorFields();
      return;
    }

    let contractsStatus: ContractsStatusModel = new ContractsStatusModel();
    contractsStatus = this.frmContractsStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      contractsStatus.contractsStatusId = this.contractsStatusId;
      this.contractsStatusService.update(contractsStatus).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Contracts/contractsStatus');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.contractsStatusService.create(contractsStatus).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Contracts/contractsStatus');
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
  get f() { return this.frmContractsStatus.controls; }

}
