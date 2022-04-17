import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CityModel } from 'src/app/models/Commons/city.model';
import { StateModel } from 'src/app/models/Commons/state.model';
import { CityService } from 'src/app/services/Commons/city.service';
import { StateService } from 'src/app/services/Commons/state.service';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})

export class CityFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmCity: FormGroup;

  // validation form
  validation = false;
  
  // City Model
  city = new CityModel();
  cityId = 0;
  cityActive = true;
  stateList: any[] = [];

  // Filter
  cityFilter = new CityModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private stateService: StateService,

    private cityService: CityService
  ) {
    super(router);
    this.createForm();
    this.stateService.getList(new StateModel()).subscribe((res: any) => {
      this.stateList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.cityId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmCity = this.formBuilder.group({
      cityName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      stateId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.cityService.get(this.cityId).subscribe((res: any) => {
      this.city = res.data[0];

      this.frmCity.get('cityName').setValue(this.city.cityName);
      this.frmCity.get('stateId').setValue(this.city.stateId);



      // Enable disable form
      
      if (this.cityActive) {
        this.frmCity.enable();
      }
      else {
        this.frmCity.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmCity.valid) {
      // Set true validation
      this.validation = true;
    
this.showAlertErrorFields();
      return;
    }

    let city: CityModel =  new CityModel();
    city = this.frmCity.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      city.cityId = this.cityId;
      this.cityService.update(city).subscribe((res: any) => {
        this.validateRequestEdit(res,'/Commons/city');
      },
      (err) => {
        this.showAlertGeneralError(err);
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.cityService.create(city).subscribe((res: any) => {
      this.validateRequestCreated(res,'/Commons/city');
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
  get f() { return this.frmCity.controls; }

}
