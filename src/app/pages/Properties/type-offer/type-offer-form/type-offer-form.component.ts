import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TypeOfferModel } from 'src/app/models/Properties/type-offer.model';

import { TypeOfferService } from 'src/app/services/Properties/type-offer.service';

@Component({
  selector: 'app-type-offer-form',
  templateUrl: './type-offer-form.component.html',
  styleUrls: ['./type-offer-form.component.scss'],
})

export class TypeOfferFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmTypeOffer: FormGroup;

  // validation form
  validation = false;
  
  // TypeOffer Model
  typeOffer = new TypeOfferModel();
  typeOfferId = 0;
  typeOfferActive = true;

  // Filter
  typeOfferFilter = new TypeOfferModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

    private typeOfferService: TypeOfferService
  ) {
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.typeOfferId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmTypeOffer = this.formBuilder.group({
      typeOfferName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.typeOfferService.get(this.typeOfferId).subscribe((res: any) => {
      this.typeOffer = res.data[0];

      this.frmTypeOffer.get('typeOfferName').setValue(this.typeOffer.typeOfferName);



      // Enable disable form
      
      if (this.typeOfferActive) {
        this.frmTypeOffer.enable();
      }
      else {
        this.frmTypeOffer.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmTypeOffer.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let typeOffer: TypeOfferModel =  new TypeOfferModel();
    typeOffer = this.frmTypeOffer.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      typeOffer.typeOfferId = this.typeOfferId;
      this.typeOfferService.update(typeOffer).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Properties/typeOffer']);
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
      this.typeOfferService.create(typeOffer).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Properties/typeOffer']);
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


  changeStatus(status: boolean, typeOffer: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${typeOffer.typeOfferId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.typeOfferService.enable(typeOffer.typeOfferId).subscribe((res: any) => {
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
        <br> <strong>Record # ${typeOffer.typeOfferId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.typeOfferService.disable(typeOffer.typeOfferId).subscribe((res: any) => {
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
  get f() { return this.frmTypeOffer.controls; }

}
