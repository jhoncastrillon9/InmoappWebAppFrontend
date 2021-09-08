import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ImagesModel } from 'src/app/models/Properties/images.model';
import { PropertyModel } from 'src/app/models/Properties/property.model';

import { ImagesService } from 'src/app/services/Properties/images.service';
import { PropertyService } from 'src/app/services/Properties/property.service';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.scss'],
})

export class ImagesFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmImages: FormGroup;

  // validation form
  validation = false;
  
  // Images Model
  images = new ImagesModel();
  imageId = 0;
  imagesActive = true;
  propertyList: any[] = [];

  // Filter
  imagesFilter = new ImagesModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,

    private imagesService: ImagesService
  ) {
    this.createForm();
    this.propertyService.getList(new PropertyModel()).subscribe((res: any) => {
      this.propertyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.imageId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmImages = this.formBuilder.group({
      imageName: new FormControl(null, [Validators.maxLength(50)]),
      path: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      isMain: new FormControl(null),
      propertyId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.imagesService.get(this.imageId).subscribe((res: any) => {
      this.images = res.data[0];

      this.frmImages.get('imageName').setValue(this.images.imageName);
      this.frmImages.get('path').setValue(this.images.path);
      this.frmImages.get('isMain').setValue(this.images.isMain);
      this.frmImages.get('propertyId').setValue(this.images.propertyId);



      // Enable disable form
      
      if (this.imagesActive) {
        this.frmImages.enable();
      }
      else {
        this.frmImages.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmImages.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let images: ImagesModel =  new ImagesModel();
    images = this.frmImages.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      images.imageId = this.imageId;
      this.imagesService.update(images).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Properties/images']);
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
      this.imagesService.create(images).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Properties/images']);
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


  changeStatus(status: boolean, images: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${images.imageId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.imagesService.enable(images.imageId).subscribe((res: any) => {
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
        <br> <strong>Record # ${images.imageId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.imagesService.disable(images.imageId).subscribe((res: any) => {
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
  get f() { return this.frmImages.controls; }

}
