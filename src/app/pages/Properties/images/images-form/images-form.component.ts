import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ImagesModel } from 'src/app/models/Properties/images.model';
import { PropertyModel } from 'src/app/models/Properties/property.model';

import { ImagesService } from 'src/app/services/Properties/images.service';
import { PropertyService } from 'src/app/services/Properties/property.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.scss'],
})

export class ImagesFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmImages: FormGroup;

  // validation form
  validation = false;

  // Images Model
  images = new ImagesModel();
  imageId = 0;
  imagesActive = true;
  propertyList: any[] = [];

  // Filter
  imagesFilter = new ImagesModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,

    private imagesService: ImagesService
  ) {
    super(router);
    this.createForm();
    this.propertyService.getList(new PropertyModel()).subscribe((res: any) => {
      this.propertyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.imageId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmImages = this.formBuilder.group({
      imageName: new FormControl(null, [Validators.maxLength(50)]),
      path: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      isMain: new FormControl(null),
      propertyId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.imagesService.get(this.imageId).subscribe((res: any) => {
      this.images = res.data[0];

      this.frmImages.get('imageName').setValue(this.images.imageName);
      this.frmImages.get('path').setValue(this.images.path);
      this.frmImages.get('isMain').setValue(this.images.isMain);
      this.frmImages.get('propertyId').setValue(this.images.propertyId);



      // Enable disable form

      if (this.imagesActive) {
        this.frmImages.enable();
      }
      else {
        this.frmImages.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmImages.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let images: ImagesModel = new ImagesModel();
    images = this.frmImages.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      images.imageId = this.imageId;
      this.imagesService.update(images).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/images');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.imagesService.create(images).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/images');
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
  get f() { return this.frmImages.controls; }

}
