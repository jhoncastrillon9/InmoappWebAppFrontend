import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CityModel } from 'src/app/models/Commons/city.model';
import { StateModel } from 'src/app/models/Commons/state.model';

import { CityService } from 'src/app/services/Commons/city.service';
import { StateService } from 'src/app/services/Commons/state.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})

export class CityFormComponent implements OnInit {
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
    private router: Router,
    private formBuilder: FormBuilder,
    private stateService: StateService,

    private cityService: CityService
  ) {
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
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let city: CityModel =  new CityModel();
    city = this.frmCity.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      city.cityId = this.cityId;
      this.cityService.update(city).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Commons/city']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('Error', 'Unexpected error', 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.cityService.create(city).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Commons/city']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('Error', 'Unexpected error', 'error');
      },
      () => {
        // Complete
      });
    }

  }


  changeStatus(status: boolean, city: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${city.cityId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.cityService.enable(city.cityId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record enabled', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('Error', 'Unexpected error', 'error');
          },
          () => {
            // Complete
          });
        }
      });
    }
    if (status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to disable this record?</h4>
        <br> <strong>Record # ${city.cityId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.cityService.disable(city.cityId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('Error', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Edit', 'Record disabled', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('Error', 'Unexpected error', 'error');
          },
          () => {
            // Complete
          });
        }
      });
    }
  }

 
  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmCity.controls; }

}
