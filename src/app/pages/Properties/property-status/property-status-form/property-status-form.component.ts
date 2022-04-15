import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';

import { PropertyStatusService } from 'src/app/services/Properties/property-status.service';
import { messages } from 'src/app/static/messages';

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
        '¡Ups!',
        'Por favor completa los campos requeridos',
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
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Properties/propertyStatus']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
      },
      () => {
        // Complete
      });
    }

    if (!this.editAction){
      this.propertyStatusService.create(propertyStatus).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Properties/propertyStatus']);
        });
      },
      (err) => {
        // Error
        // console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${propertyStatus.propertyStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyStatusService.enable(propertyStatus.propertyStatusId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
        <br> <strong>Registro # ${propertyStatus.propertyStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyStatusService.disable(propertyStatus.propertyStatusId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.initForm();
            });
          },
          (err) => {
            // Error
            // console.log(err);
            Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
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
