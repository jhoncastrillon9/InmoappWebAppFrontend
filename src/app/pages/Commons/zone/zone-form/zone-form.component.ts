import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ZoneModel } from 'src/app/models/Commons/zone.model';
import { CityModel } from 'src/app/models/Commons/city.model';

import { ZoneService } from 'src/app/services/Commons/zone.service';
import { CityService } from 'src/app/services/Commons/city.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})

export class ZoneFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmZone: FormGroup;

  // validation form
  validation = false;
  
  // Zone Model
  zone = new ZoneModel();
  zoneId = 0;
  zoneActive = true;
  cityList: any[] = [];

  // Filter
  zoneFilter = new ZoneModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,

    private zoneService: ZoneService
  ) {
    super(router);
    this.createForm();
    this.cityService.getList(new CityModel()).subscribe((res: any) => {
      this.cityList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.zoneId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmZone = this.formBuilder.group({
      zoneName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      cityId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.zoneService.get(this.zoneId).subscribe((res: any) => {
      this.zone = res.data[0];

      this.frmZone.get('zoneName').setValue(this.zone.zoneName);
      this.frmZone.get('cityId').setValue(this.zone.cityId);



      // Enable disable form
      
      if (this.zoneActive) {
        this.frmZone.enable();
      }
      else {
        this.frmZone.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmZone.valid) {
      // Set true validation
      this.validation = true;
    
this.showAlertErrorFields();
      return;
    }

    let zone: ZoneModel =  new ZoneModel();
    zone = this.frmZone.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      zone.zoneId = this.zoneId;
      this.zoneService.update(zone).subscribe((res: any) => {
      this.validateRequestEdit(res,'/Commons/zone');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.zoneService.create(zone).subscribe((res: any) => {
      this.validateRequestCreated(res,'/Commons/zone');       
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
  get f() { return this.frmZone.controls; }

}
