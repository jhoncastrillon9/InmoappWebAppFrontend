import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';

import { PropertyStatusService } from 'src/app/services/Properties/property-status.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-property-status-form',
  templateUrl: './property-status-form.component.html',
  styleUrls: ['./property-status-form.component.scss'],
})

export class PropertyStatusFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmPropertyStatus: FormGroup;

  // validation form
  validation = false;

  // PropertyStatus Model
  propertyStatus = new PropertyStatusModel();
  propertyStatusId = 0;
  propertyStatusActive = true;

  // Filter
  propertyStatusFilter = new PropertyStatusModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private propertyStatusService: PropertyStatusService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.propertyStatusId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPropertyStatus = this.formBuilder.group({
      propertyStatusName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.propertyStatusService.get(this.propertyStatusId).subscribe((res: any) => {
      this.propertyStatus = res.data[0];
      this.frmPropertyStatus.get('propertyStatusName').setValue(this.propertyStatus.propertyStatusName);
      // Enable disable form

      if (this.propertyStatusActive) {
        this.frmPropertyStatus.enable();
      }
      else {
        this.frmPropertyStatus.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmPropertyStatus.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let propertyStatus: PropertyStatusModel = new PropertyStatusModel();
    propertyStatus = this.frmPropertyStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      propertyStatus.propertyStatusId = this.propertyStatusId;
      this.propertyStatusService.update(propertyStatus).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/propertyStatus');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.propertyStatusService.create(propertyStatus).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/propertyStatus');
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
  get f() { return this.frmPropertyStatus.controls; }

}
