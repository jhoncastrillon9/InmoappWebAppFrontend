import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { OwnerModel } from 'src/app/models/Owners/owner.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { OwnerService } from 'src/app/services/Owners/owner.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.scss'],
})

export class OwnerFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmOwner: FormGroup;

  // validation form
  validation = false;
  
  // Owner Model
  owner = new OwnerModel();
  ownerId = 0;
  ownerActive = true;
  companyList: any[] = [];

  // Filter
  ownerFilter = new OwnerModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,

    private ownerService: OwnerService
  ) {
    this.createForm();
    this.companyService.getList(new CompanyModel()).subscribe((res: any) => {
      this.companyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.ownerId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmOwner = this.formBuilder.group({
      ownerName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      document: new FormControl(null, [Validators.maxLength(50)]),
      telephone: new FormControl(null, [Validators.maxLength(30)]),
      mobile: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(80)]),
      address: new FormControl(null, [Validators.maxLength(200)]),
      observation: new FormControl(null, [Validators.maxLength(500)]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.ownerService.get(this.ownerId).subscribe((res: any) => {
      this.owner = res.data[0];

      this.frmOwner.get('ownerName').setValue(this.owner.ownerName);
      this.frmOwner.get('document').setValue(this.owner.document);
      this.frmOwner.get('telephone').setValue(this.owner.telephone);
      this.frmOwner.get('mobile').setValue(this.owner.mobile);
      this.frmOwner.get('email').setValue(this.owner.email);
      this.frmOwner.get('address').setValue(this.owner.address);
      this.frmOwner.get('observation').setValue(this.owner.observation);
      this.frmOwner.get('compayId').setValue(this.owner.compayId);



      // Enable disable form
      
      if (this.ownerActive) {
        this.frmOwner.enable();
      }
      else {
        this.frmOwner.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmOwner.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let owner: OwnerModel =  new OwnerModel();
    owner = this.frmOwner.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      owner.ownerId = this.ownerId;
      this.ownerService.update(owner).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Owners/owner']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.ownerService.create(owner).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Owners/owner']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
      },
      () => {
        // Complete
      });
    }

  }


  changeStatus(status: boolean, owner: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${owner.ownerId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.ownerService.enable(owner.ownerId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
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
        html: `<h4>¿Estas seguro de desactivar este registro?</h4>
        <br> <strong>Registro # ${owner.ownerId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.ownerService.disable(owner.ownerId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
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
  get f() { return this.frmOwner.controls; }

}
