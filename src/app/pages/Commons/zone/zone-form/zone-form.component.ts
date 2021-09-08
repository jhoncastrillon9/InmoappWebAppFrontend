import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ZoneModel } from 'src/app/models/Commons/zone.model';
import { CityModel } from 'src/app/models/Commons/city.model';

import { ZoneService } from 'src/app/services/Commons/zone.service';
import { CityService } from 'src/app/services/Commons/city.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss'],
})

export class ZoneFormComponent implements OnInit {
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
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,

    private zoneService: ZoneService
  ) {
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
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let zone: ZoneModel =  new ZoneModel();
    zone = this.frmZone.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      zone.zoneId = this.zoneId;
      this.zoneService.update(zone).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Commons/zone']);
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
      this.zoneService.create(zone).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Commons/zone']);
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


  changeStatus(status: boolean, zone: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${zone.zoneId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.zoneService.enable(zone.zoneId).subscribe((res: any) => {
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
        <br> <strong>Record # ${zone.zoneId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.zoneService.disable(zone.zoneId).subscribe((res: any) => {
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
  get f() { return this.frmZone.controls; }

}
