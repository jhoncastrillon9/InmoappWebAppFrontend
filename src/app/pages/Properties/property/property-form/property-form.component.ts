import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyModel } from 'src/app/models/Properties/property.model';
import { IvaModel } from 'src/app/models/Properties/iva.model';
import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';
import { CityModel } from 'src/app/models/Commons/city.model';
import { ZoneModel } from 'src/app/models/Commons/zone.model';
import { OwnerModel } from 'src/app/models/Owners/owner.model';
import { PropertyCategoryModel } from 'src/app/models/Properties/property-category.model';
import { TypeOfferModel } from 'src/app/models/Properties/type-offer.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { PropertyService } from 'src/app/services/Properties/property.service';
import { IvaService } from 'src/app/services/Properties/iva.service';
import { PropertyStatusService } from 'src/app/services/Properties/property-status.service';
import { CityService } from 'src/app/services/Commons/city.service';
import { ZoneService } from 'src/app/services/Commons/zone.service';
import { OwnerService } from 'src/app/services/Owners/owner.service';
import { PropertyCategoryService } from 'src/app/services/Properties/property-category.service';
import { TypeOfferService } from 'src/app/services/Properties/type-offer.service';
import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})

export class PropertyFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmProperty: FormGroup;

  // validation form
  validation = false;

  // Property Model
  property = new PropertyModel();
  propertyId = 0;
  propertyActive = true;
  ivaList: any[] = [];
  propertyStatusList: any[] = [];
  cityList: any[] = [];
  zoneList: any[] = [];
  ownerList: any[] = [];
  propertyCategoryList: any[] = [];
  typeOfferList: any[] = [];
  companyList: any[] = [];

  // Filter
  propertyFilter = new PropertyModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private ivaService: IvaService,
    private propertyStatusService: PropertyStatusService,
    private cityService: CityService,
    private zoneService: ZoneService,
    private ownerService: OwnerService,
    private propertyCategoryService: PropertyCategoryService,
    private typeOfferService: TypeOfferService,
    private propertyService: PropertyService
  ) {
    super(router);
    this.createForm();
    this.ivaService.getList(new IvaModel()).subscribe((res: any) => {
      this.ivaList = res.data;
    });

    this.propertyStatusService.getList(new PropertyStatusModel()).subscribe((res: any) => {
      this.propertyStatusList = res.data;
    });

    this.cityService.getList(new CityModel()).subscribe((res: any) => {
      this.cityList = res.data;
    });


    this.ownerService.getList(new OwnerModel()).subscribe((res: any) => {
      this.ownerList = res.data;
    });

    this.propertyCategoryService.getList(new PropertyCategoryModel()).subscribe((res: any) => {
      this.propertyCategoryList = res.data;
    });

    this.typeOfferService.getList(new TypeOfferModel()).subscribe((res: any) => {
      this.typeOfferList = res.data;
    });

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.propertyId = id;
        this.initForm();
      }
    });
  }

  generateCodealeatory(){
    return Math.random().toString(10).slice(2, 7);
  }

  loadZone(cityId){
    this.frmProperty.controls['zoneId'].setValue(null)
    this.zoneList = null;
    this.zoneService.getList(new ZoneModel(null,null,cityId)).subscribe((res: any) => {
      this.zoneList = res.data;
    });

  }
  // Reactive Form
  createForm(): void {
   
    this.frmProperty = this.formBuilder.group({
      idIva: new FormControl(null),
      code: new FormControl(this.generateCodealeatory(), [Validators.required, Validators.maxLength(100)]),
      title: new FormControl(null, [Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(500)]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      priceOwner: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      percentage: new FormControl(null, [Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      feeCompany: new FormControl(null, [Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      recruitmentDate: new FormControl(this.getDateToday()),
      finalPrice: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      rooms: new FormControl(null, [Validators.pattern('^-?[0-9]*$'), Validators.min(-2147483648), Validators.max(2147483647)]),
      toilets: new FormControl(null, [Validators.pattern('^-?[0-9]*$'), Validators.min(-2147483648), Validators.max(2147483647)]),
      reception: new FormControl(null),
      pool: new FormControl(null),
      area: new FormControl(null, [Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      observation: new FormControl(null, [Validators.maxLength(500)]),
      propertyStatusId: new FormControl(null, [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      zoneId: new FormControl(null, [Validators.required]),
      ownerId: new FormControl(null, [Validators.required]),
      propertyCategoryId: new FormControl(null, [Validators.required]),
      typeOfferId: new FormControl(null, [Validators.required]),
    });
  }


  // Set data
  initForm(): void {
    this.propertyService.get(this.propertyId).subscribe((res: any) => {
      this.property = res.data[0];

      this.frmProperty.get('idIva').setValue(this.property.idIva);
      this.frmProperty.get('code').setValue(this.property.code);
      this.frmProperty.get('title').setValue(this.property.title);
      this.frmProperty.get('description').setValue(this.property.description);
      this.frmProperty.get('address').setValue(this.property.address);
      this.frmProperty.get('priceOwner').setValue(this.property.priceOwner);
      this.frmProperty.get('percentage').setValue(this.property.percentage);
      this.frmProperty.get('feeCompany').setValue(this.property.feeCompany);
      this.frmProperty.get('recruitmentDate').setValue(this.property.recruitmentDate);
      this.frmProperty.get('finalPrice').setValue(this.property.finalPrice);
      this.frmProperty.get('rooms').setValue(this.property.rooms);
      this.frmProperty.get('toilets').setValue(this.property.toilets);
      this.frmProperty.get('reception').setValue(this.property.reception);
      this.frmProperty.get('pool').setValue(this.property.pool);
      this.frmProperty.get('area').setValue(this.property.area);
      this.frmProperty.get('observation').setValue(this.property.observation);
      this.frmProperty.get('propertyStatusId').setValue(this.property.propertyStatusId);
      this.frmProperty.get('cityId').setValue(this.property.cityId);
      this.frmProperty.get('zoneId').setValue(this.property.zoneId);
      this.frmProperty.get('ownerId').setValue(this.property.ownerId);
      this.frmProperty.get('propertyCategoryId').setValue(this.property.propertyCategoryId);
      this.frmProperty.get('typeOfferId').setValue(this.property.typeOfferId);

      // Enable disable form

      if (this.propertyActive) {
        this.frmProperty.enable();
      }
      else {
        this.frmProperty.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmProperty.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let property: PropertyModel = new PropertyModel();
    property = this.frmProperty.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      property.propertyId = this.propertyId;
      this.propertyService.update(property).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Properties/property');
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.propertyService.create(property).subscribe((res: any) => {
        this.validateRequestCreated(res, '/Properties/property');
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
  get f() { return this.frmProperty.controls; }

}
