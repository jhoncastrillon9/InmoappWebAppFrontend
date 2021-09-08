import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';

import { PropertyStatusService } from 'src/app/services/Properties/property-status.service';

@Component({
  selector: 'app-property-status-form',
  templateUrl: './property-status-form.component.html',
  styleUrls: ['./property-status-form.component.scss'],
})

export class PropertyStatusFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmPropertyStatus: FormGroup;

  // validation form
  validation = false;
  
  // PropertyStatus Model
  propertyStatus = new PropertyStatusModel();
  propertyStatusId = 0;
  propertyStatusActive = true;

  // Filter
  propertyStatusFilter = new PropertyStatusModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

    private propertyStatusService: PropertyStatusService
  ) {
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.propertyStatusId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPropertyStatus = this.formBuilder.group({
      propertyStatusName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.propertyStatusService.get(this.propertyStatusId).subscribe((res: any) => {
      this.propertyStatus = res.data[0];

      this.frmPropertyStatus.get('propertyStatusName').setValue(this.propertyStatus.propertyStatusName);



      // Enable disable form
      
      if (this.propertyStatusActive) {
        this.frmPropertyStatus.enable();
      }
      else {
        this.frmPropertyStatus.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmPropertyStatus.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let propertyStatus: PropertyStatusModel =  new PropertyStatusModel();
    propertyStatus = this.frmPropertyStatus.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      propertyStatus.propertyStatusId = this.propertyStatusId;
      this.propertyStatusService.update(propertyStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Properties/propertyStatus']);
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
      this.propertyStatusService.create(propertyStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Properties/propertyStatus']);
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


  changeStatus(status: boolean, propertyStatus: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${propertyStatus.propertyStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.propertyStatusService.enable(propertyStatus.propertyStatusId).subscribe((res: any) => {
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
        <br> <strong>Record # ${propertyStatus.propertyStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.propertyStatusService.disable(propertyStatus.propertyStatusId).subscribe((res: any) => {
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
  get f() { return this.frmPropertyStatus.controls; }

}
