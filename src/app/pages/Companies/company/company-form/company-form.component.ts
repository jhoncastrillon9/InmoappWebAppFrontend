import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CompanyModel } from 'src/app/models/Companies/company.model';

import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})

export class CompanyFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmCompany: FormGroup;

  // validation form
  validation = false;
  
  // Company Model
  company = new CompanyModel();
  compayId = 0;
  companyActive = true;

  // Filter
  companyFilter = new CompanyModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,

    private companyService: CompanyService
  ) {
    super(router);
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.compayId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmCompany = this.formBuilder.group({
      companyName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      document: new FormControl(null, [Validators.maxLength(50)]),
      telephone: new FormControl(null, [Validators.maxLength(30)]),
      mobile: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(80)]),
      address: new FormControl(null, [Validators.maxLength(200)]),
      observation: new FormControl(null, [Validators.maxLength(500)]),

    });
  }


  // Set data
  initForm(): void {
    this.companyService.get(this.compayId).subscribe((res: any) => {
      this.company = res.data[0];

      this.frmCompany.get('companyName').setValue(this.company.companyName);
      this.frmCompany.get('document').setValue(this.company.document);
      this.frmCompany.get('telephone').setValue(this.company.telephone);
      this.frmCompany.get('mobile').setValue(this.company.mobile);
      this.frmCompany.get('email').setValue(this.company.email);
      this.frmCompany.get('address').setValue(this.company.address);
      this.frmCompany.get('observation').setValue(this.company.observation);



      // Enable disable form
      
      if (this.companyActive) {
        this.frmCompany.enable();
      }
      else {
        this.frmCompany.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmCompany.valid) {
      // Set true validation
      this.validation = true;
    
this.showAlertErrorFields();
      return;
    }

    let company: CompanyModel =  new CompanyModel();
    company = this.frmCompany.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      company.compayId = this.compayId;
      this.companyService.update(company).subscribe((res: any) => {
        this.validateRequestEdit(res,'/start');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.companyService.create(company).subscribe((res: any) => {
        this.validateRequestCreated(res,'/start');

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
  get f() { return this.frmCompany.controls; }

}
