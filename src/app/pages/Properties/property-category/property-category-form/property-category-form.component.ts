import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyCategoryModel } from 'src/app/models/Properties/property-category.model';

import { PropertyCategoryService } from 'src/app/services/Properties/property-category.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-property-category-form',
  templateUrl: './property-category-form.component.html',
  styleUrls: ['./property-category-form.component.scss'],
})

export class PropertyCategoryFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmPropertyCategory: FormGroup;

  // validation form
  validation = false;

  // PropertyCategory Model
  propertyCategory = new PropertyCategoryModel();
  propertyCategoryId = 0;
  propertyCategoryActive = true;

  // Filter
  propertyCategoryFilter = new PropertyCategoryModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private propertyCategoryService: PropertyCategoryService
  ) {
    super(router);
    this.createForm();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.propertyCategoryId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPropertyCategory = this.formBuilder.group({
      categoryName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.propertyCategoryService.get(this.propertyCategoryId).subscribe((res: any) => {
      this.propertyCategory = res.data[0];

      this.frmPropertyCategory.get('categoryName').setValue(this.propertyCategory.categoryName);



      // Enable disable form

      if (this.propertyCategoryActive) {
        this.frmPropertyCategory.enable();
      }
      else {
        this.frmPropertyCategory.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmPropertyCategory.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let propertyCategory: PropertyCategoryModel = new PropertyCategoryModel();
    propertyCategory = this.frmPropertyCategory.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      propertyCategory.propertyCategoryId = this.propertyCategoryId;
      this.propertyCategoryService.update(propertyCategory).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/propertyCategory');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.propertyCategoryService.create(propertyCategory).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/propertyCategory');
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
  get f() { return this.frmPropertyCategory.controls; }

}
