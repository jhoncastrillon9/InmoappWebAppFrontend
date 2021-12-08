import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PropertyCategoryModel } from 'src/app/models/Properties/property-category.model';

import { PropertyCategoryService } from 'src/app/services/Properties/property-category.service';

@Component({
  selector: 'app-property-category-form',
  templateUrl: './property-category-form.component.html',
  styleUrls: ['./property-category-form.component.scss'],
})

export class PropertyCategoryFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmPropertyCategory: FormGroup;

  // validation form
  validation = false;
  
  // PropertyCategory Model
  propertyCategory = new PropertyCategoryModel();
  propertyCategoryId = 0;
  propertyCategoryActive = true;

  // Filter
  propertyCategoryFilter = new PropertyCategoryModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

    private propertyCategoryService: PropertyCategoryService
  ) {
    this.createForm();

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.propertyCategoryId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmPropertyCategory = this.formBuilder.group({
      categoryName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),

    });
  }


  // Set data
  initForm(): void {
    this.propertyCategoryService.get(this.propertyCategoryId).subscribe((res: any) => {
      this.propertyCategory = res.data[0];

      this.frmPropertyCategory.get('categoryName').setValue(this.propertyCategory.categoryName);



      // Enable disable form
      
      if (this.propertyCategoryActive) {
        this.frmPropertyCategory.enable();
      }
      else {
        this.frmPropertyCategory.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmPropertyCategory.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let propertyCategory: PropertyCategoryModel =  new PropertyCategoryModel();
    propertyCategory = this.frmPropertyCategory.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      propertyCategory.propertyCategoryId = this.propertyCategoryId;
      this.propertyCategoryService.update(propertyCategory).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Properties/propertyCategory']);
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
      this.propertyCategoryService.create(propertyCategory).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Properties/propertyCategory']);
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


  changeStatus(status: boolean, propertyCategory: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${propertyCategory.propertyCategoryId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyCategoryService.enable(propertyCategory.propertyCategoryId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${propertyCategory.propertyCategoryId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyCategoryService.disable(propertyCategory.propertyCategoryId).subscribe((res: any) => {
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
  get f() { return this.frmPropertyCategory.controls; }

}
