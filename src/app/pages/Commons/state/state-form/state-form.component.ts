import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { StateModel } from 'src/app/models/Commons/state.model';

import { StateService } from 'src/app/services/Commons/state.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss'],
})

export class StateFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmState: FormGroup;

  // validation form
  validation = false;

  // State Model
  state = new StateModel();
  stateId = 0;
  stateActive = true;

  // Filter
  stateFilter = new StateModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private stateService: StateService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.stateId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmState = this.formBuilder.group({
      stateName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),

    });
  }


  // Set data
  initForm(): void {
    this.stateService.get(this.stateId).subscribe((res: any) => {
      this.state = res.data[0];

      this.frmState.get('stateName').setValue(this.state.stateName);



      // Enable disable form

      if (this.stateActive) {
        this.frmState.enable();
      }
      else {
        this.frmState.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmState.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let state: StateModel = new StateModel();
    state = this.frmState.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      state.stateId = this.stateId;
      this.stateService.update(state).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Commons/state');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.stateService.create(state).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Commons/state');
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
  get f() { return this.frmState.controls; }

}
