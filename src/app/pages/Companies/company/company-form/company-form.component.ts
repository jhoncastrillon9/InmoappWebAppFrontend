import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CompanyModel } from 'src/app/models/Companies/company.model';

import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})

export class CompanyFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmCompany: FormGroup;

  // validation form
  validation = false;
  
  // Company Model
  company = new CompanyModel();
  compayId = 0;
  companyActive = true;

  // Filter
  companyFilter = new CompanyModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

    private companyService: CompanyService
  ) {
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.compayId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmCompany = this.formBuilder.group({
      companyName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      document: new FormControl(null, [Validators.maxLength(50)]),
      telephone: new FormControl(null, [Validators.maxLength(30)]),
      mobile: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(80)]),
      address: new FormControl(null, [Validators.maxLength(200)]),
      observation: new FormControl(null, [Validators.maxLength(500)]),

    });
  }


  // Set data
  initForm(): void {
    this.companyService.get(this.compayId).subscribe((res: any) => {
      this.company = res.data[0];

      this.frmCompany.get('companyName').setValue(this.company.companyName);
      this.frmCompany.get('document').setValue(this.company.document);
      this.frmCompany.get('telephone').setValue(this.company.telephone);
      this.frmCompany.get('mobile').setValue(this.company.mobile);
      this.frmCompany.get('email').setValue(this.company.email);
      this.frmCompany.get('address').setValue(this.company.address);
      this.frmCompany.get('observation').setValue(this.company.observation);



      // Enable disable form
      
      if (this.companyActive) {
        this.frmCompany.enable();
      }
      else {
        this.frmCompany.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmCompany.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        'Error',
        'Please, fill in all the required fields correctly',
        'error'
      );
      return;
    }

    let company: CompanyModel =  new CompanyModel();
    company = this.frmCompany.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      company.compayId = this.compayId;
      this.companyService.update(company).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Edit', 'Record edited', 'success').then(() => {
          this.router.navigate(['/Companies/company']);
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
      this.companyService.create(company).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('Error', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Create', 'Record created', 'success').then(() => {
          this.router.navigate(['/Companies/company']);
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


  changeStatus(status: boolean, company: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>Record # ${company.compayId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.companyService.enable(company.compayId).subscribe((res: any) => {
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
        <br> <strong>Record # ${company.compayId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.companyService.disable(company.compayId).subscribe((res: any) => {
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
  get f() { return this.frmCompany.controls; }

}
