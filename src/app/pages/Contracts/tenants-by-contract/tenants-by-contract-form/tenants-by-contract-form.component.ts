import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TenantsByContractModel } from 'src/app/models/Contracts/tenants-by-contract.model';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';

import { TenantsByContractService } from 'src/app/services/Contracts/tenants-by-contract.service';
import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { messages } from 'src/app/static/messages';

@Component({
  selector: 'app-tenants-by-contract-form',
  templateUrl: './tenants-by-contract-form.component.html',
  styleUrls: ['./tenants-by-contract-form.component.scss'],
})

export class TenantsByContractFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmTenantsByContract: FormGroup;

  // validation form
  validation = false;
  
  // TenantsByContract Model
  tenantsByContract = new TenantsByContractModel();
  tenantsByContractId = 0;
  tenantsByContractActive = true;
  tenantList: any[] = [];

  // Filter
  tenantsByContractFilter = new TenantsByContractModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tenantService: TenantService,

    private tenantsByContractService: TenantsByContractService
  ) {
    this.createForm();
    this.tenantService.getList(new TenantModel()).subscribe((res: any) => {
      this.tenantList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.tenantsByContractId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmTenantsByContract = this.formBuilder.group({
      tenantId: new FormControl(null, [Validators.required]),
      profile: new FormControl(null, [Validators.maxLength(300)]),

    });
  }


  // Set data
  initForm(): void {
    this.tenantsByContractService.get(this.tenantsByContractId).subscribe((res: any) => {
      this.tenantsByContract = res.data[0];

      this.frmTenantsByContract.get('tenantId').setValue(this.tenantsByContract.tenantId);
      this.frmTenantsByContract.get('profile').setValue(this.tenantsByContract.profile);



      // Enable disable form
      
      if (this.tenantsByContractActive) {
        this.frmTenantsByContract.enable();
      }
      else {
        this.frmTenantsByContract.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmTenantsByContract.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor completa los campos requeridos',
        'error'
      );
      return;
    }

    let tenantsByContract: TenantsByContractModel =  new TenantsByContractModel();
    tenantsByContract = this.frmTenantsByContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      tenantsByContract.tenantsByContractId = this.tenantsByContractId;
      this.tenantsByContractService.update(tenantsByContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Contracts/tenantsByContract']);
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
      this.tenantsByContractService.create(tenantsByContract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Contracts/tenantsByContract']);
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


  changeStatus(status: boolean, tenantsByContract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${tenantsByContract.tenantsByContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.tenantsByContractService.enable(tenantsByContract.tenantsByContractId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${tenantsByContract.tenantsByContractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.tenantsByContractService.disable(tenantsByContract.tenantsByContractId).subscribe((res: any) => {
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
  get f() { return this.frmTenantsByContract.controls; }

}
