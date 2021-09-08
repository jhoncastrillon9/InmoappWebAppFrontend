import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NeighborhoodModel } from 'src/app/models/Commons/neighborhood.model';
import { ZoneModel } from 'src/app/models/Commons/zone.model';

import { NeighborhoodService } from 'src/app/services/Commons/neighborhood.service';
import { ZoneService } from 'src/app/services/Commons/zone.service';

@Component({
  selector: 'app-neighborhood-form',
  templateUrl: './neighborhood-form.component.html',
  styleUrls: ['./neighborhood-form.component.scss'],
})

export class NeighborhoodFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmNeighborhood: FormGroup;

  // validation form
  validation = false;
  
  // Neighborhood Model
  neighborhood = new NeighborhoodModel();
  neighborhoodId = 0;
  neighborhoodActive = true;
  zoneList: any[] = [];

  // Filter
  neighborhoodFilter = new NeighborhoodModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private zoneService: ZoneService,

    private neighborhoodService: NeighborhoodService
  ) {
    this.createForm();
    this.zoneService.getList(new ZoneModel()).subscribe((res: any) => {
      this.zoneList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.neighborhoodId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmNeighborhood = this.formBuilder.group({
      neighborhoodName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      zoneId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.neighborhoodService.get(this.neighborhoodId).subscribe((res: any) => {
      this.neighborhood = res.data[0];

      this.frmNeighborhood.get('neighborhoodName').setValue(this.neighborhood.neighborhoodName);
      this.frmNeighborhood.get('zoneId').setValue(this.neighborhood.zoneId);



      // Enable disable form
      
      if (this.neighborhoodActive) {
        this.frmNeighborhood.enable();
      }
      else {
        this.frmNeighborhood.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmNeighborhood.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let neighborhood: NeighborhoodModel =  new NeighborhoodModel();
    neighborhood = this.frmNeighborhood.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      neighborhood.neighborhoodId = this.neighborhoodId;
      this.neighborhoodService.update(neighborhood).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Commons/neighborhood']);
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
      this.neighborhoodService.create(neighborhood).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Commons/neighborhood']);
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


  changeStatus(status: boolean, neighborhood: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${neighborhood.neighborhoodId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.neighborhoodService.enable(neighborhood.neighborhoodId).subscribe((res: any) => {
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
        <br> <strong>Record # ${neighborhood.neighborhoodId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.neighborhoodService.disable(neighborhood.neighborhoodId).subscribe((res: any) => {
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
  get f() { return this.frmNeighborhood.controls; }

}
