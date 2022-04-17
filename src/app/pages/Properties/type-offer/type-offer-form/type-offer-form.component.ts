import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TypeOfferModel } from 'src/app/models/Properties/type-offer.model';
import { TypeOfferService } from 'src/app/services/Properties/type-offer.service';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-type-offer-form',
  templateUrl: './type-offer-form.component.html',
  styleUrls: ['./type-offer-form.component.scss'],
})

export class TypeOfferFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmTypeOffer: FormGroup;

  // validation form
  validation = false;

  // TypeOffer Model
  typeOffer = new TypeOfferModel();
  typeOfferId = 0;
  typeOfferActive = true;

  // Filter
  typeOfferFilter = new TypeOfferModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private typeOfferService: TypeOfferService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.typeOfferId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmTypeOffer = this.formBuilder.group({
      typeOfferName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.typeOfferService.get(this.typeOfferId).subscribe((res: any) => {
      this.typeOffer = res.data[0];

      this.frmTypeOffer.get('typeOfferName').setValue(this.typeOffer.typeOfferName);

      // Enable disable form      
      if (this.typeOfferActive) {
        this.frmTypeOffer.enable();
      }
      else {
        this.frmTypeOffer.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmTypeOffer.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let typeOffer: TypeOfferModel = new TypeOfferModel();
    typeOffer = this.frmTypeOffer.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      typeOffer.typeOfferId = this.typeOfferId;
      this.typeOfferService.update(typeOffer).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/typeOffer');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.typeOfferService.create(typeOffer).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/typeOffer');
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
  get f() { return this.frmTypeOffer.controls; }

}
