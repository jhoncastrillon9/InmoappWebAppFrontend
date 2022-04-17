import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerModel } from 'src/app/models/Owners/owner.model';
import { OwnerService } from 'src/app/services/Owners/owner.service';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
})

export class OwnerFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmOwner: FormGroup;

  // validation form
  validation = false;
  
  // Owner Model
  owner = new OwnerModel();
  ownerId = 0;
  ownerActive = true;
  companyList: any[] = [];

  // Filter
  ownerFilter = new OwnerModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private ownerService: OwnerService
  ) {
    super(router);
    this.createForm();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.ownerId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmOwner = this.formBuilder.group({
      ownerName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      document: new FormControl(null, [Validators.maxLength(50)]),
      telephone: new FormControl(null, [Validators.maxLength(30)]),
      mobile: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(80)]),
      address: new FormControl(null, [Validators.maxLength(200)]),
      observation: new FormControl(null, [Validators.maxLength(500)])     

    });
  }


  // Set data
  initForm(): void {
    this.ownerService.get(this.ownerId).subscribe((res: any) => {
      this.owner = res.data[0];

      this.frmOwner.get('ownerName').setValue(this.owner.ownerName);
      this.frmOwner.get('document').setValue(this.owner.document);
      this.frmOwner.get('telephone').setValue(this.owner.telephone);
      this.frmOwner.get('mobile').setValue(this.owner.mobile);
      this.frmOwner.get('email').setValue(this.owner.email);
      this.frmOwner.get('address').setValue(this.owner.address);
      this.frmOwner.get('observation').setValue(this.owner.observation);      



      // Enable disable form
      
      if (this.ownerActive) {
        this.frmOwner.enable();
      }
      else {
        this.frmOwner.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmOwner.valid) {
      // Set true validation
      this.validation = true;
    this.showAlertErrorFields();    
      return;
    }

    let owner: OwnerModel =  new OwnerModel();
    owner = this.frmOwner.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      owner.ownerId = this.ownerId;
      this.ownerService.update(owner).subscribe((res: any) => {
        this.validateRequestEdit(res,'/Owners/owner');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.ownerService.create(owner).subscribe((res: any) => {           
        this.validateRequestCreated(res,'/Owners/owner');
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
  get f() { return this.frmOwner.controls; }

}