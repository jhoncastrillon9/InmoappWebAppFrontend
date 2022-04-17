import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IvaModel } from 'src/app/models/Properties/iva.model';

import { IvaService } from 'src/app/services/Properties/iva.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-iva-form',
  templateUrl: './iva-form.component.html',
  styleUrls: ['./iva-form.component.scss'],
})

export class IvaFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmIva: FormGroup;

  // validation form
  validation = false;

  // Iva Model
  iva = new IvaModel();
  ivaId = 0;
  ivaActive = true;

  // Filter
  ivaFilter = new IvaModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private ivaService: IvaService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.ivaId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmIva = this.formBuilder.group({
      valor: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),

    });
  }


  // Set data
  initForm(): void {
    this.ivaService.get(this.ivaId).subscribe((res: any) => {
      this.iva = res.data[0];

      this.frmIva.get('valor').setValue(this.iva.valor);
      // Enable disable form

      if (this.ivaActive) {
        this.frmIva.enable();
      }
      else {
        this.frmIva.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmIva.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let iva: IvaModel = new IvaModel();
    iva = this.frmIva.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      iva.ivaId = this.ivaId;
      this.ivaService.update(iva).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/iva');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.ivaService.create(iva).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/iva');
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
  get f() { return this.frmIva.controls; }

}
