import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { ContractsStatusModel } from 'src/app/models/Contracts/contracts-status.model';
import { PropertyModel } from 'src/app/models/Properties/property.model';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { ContractService } from 'src/app/services/Contracts/contract.service';
import { ContractsStatusService } from 'src/app/services/Contracts/contracts-status.service';
import { PropertyService } from 'src/app/services/Properties/property.service';
import { TenantService } from 'src/app/services/Tenants/tenant.service';
import { CompanyService } from 'src/app/services/Companies/company.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
})

export class ContractFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmContract: FormGroup;

  // validation form
  validation = false;
  
  // Contract Model
  contract = new ContractModel();
  contractId = 0;
  contractActive = true;
  contractsStatusList: any[] = [];
  propertyList: any[] = [];
  tenantList: any[] = [];
  companyList: any[] = [];

  // Filter
  contractFilter = new ContractModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private contractsStatusService: ContractsStatusService,
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private companyService: CompanyService,

    private contractService: ContractService
  ) {
    this.createForm();
    this.contractsStatusService.getList(new ContractsStatusModel()).subscribe((res: any) => {
      this.contractsStatusList = res.data;
    });

    this.propertyService.getList(new PropertyModel()).subscribe((res: any) => {
      this.propertyList = res.data;
    });

    this.tenantService.getList(new TenantModel()).subscribe((res: any) => {
      this.tenantList = res.data;
    });

    this.companyService.getList(new CompanyModel()).subscribe((res: any) => {
      this.companyList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.contractId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmContract = this.formBuilder.group({
      contractDate: new FormControl(null, [Validators.required]),
      innitialDate: new FormControl(null, [Validators.required]),
      quantityMonths: new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9]*$'), Validators.min(-2147483648), Validators.max(2147483647)]),
      rentalFeeForOwner: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      rentalFeeForTennat: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4})?$')]),
      observation: new FormControl(null, [Validators.maxLength(300)]),
      statusId: new FormControl(null),
      propertyId: new FormControl(null, [Validators.required]),
      tenantId: new FormControl(null, [Validators.required]),
      compayId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.contractService.get(this.contractId).subscribe((res: any) => {
      this.contract = res.data[0];

      this.frmContract.get('contractDate').setValue(this.contract.contractDate);
      this.frmContract.get('innitialDate').setValue(this.contract.innitialDate);
      this.frmContract.get('quantityMonths').setValue(this.contract.quantityMonths);
      this.frmContract.get('rentalFeeForOwner').setValue(this.contract.rentalFeeForOwner);
      this.frmContract.get('rentalFeeForTennat').setValue(this.contract.rentalFeeForTennat);
      this.frmContract.get('observation').setValue(this.contract.observation);
      this.frmContract.get('statusId').setValue(this.contract.statusId);
      this.frmContract.get('propertyId').setValue(this.contract.propertyId);
      this.frmContract.get('tenantId').setValue(this.contract.tenantId);
      this.frmContract.get('compayId').setValue(this.contract.compayId);



      // Enable disable form
      
      if (this.contractActive) {
        this.frmContract.enable();
      }
      else {
        this.frmContract.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmContract.valid) {
      // Set true validation
      this.validation = true;
    
      Swal.fire(
        '¡Ups!',
        'Por favor complete los campos requeridos',
        'error'
      );
      return;
    }

    let contract: ContractModel =  new ContractModel();
    contract = this.frmContract.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      contract.contractId = this.contractId;
      this.contractService.update(contract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
          this.router.navigate(['/Contracts/contract']);
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
      this.contractService.create(contract).subscribe((res: any) => {
        // console.log(res);
        if (res.data[0].errorId !== 0) {
          Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
          return;
        }

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Contracts/contract']);
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


  changeStatus(status: boolean, contract: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${contract.contractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.contractService.enable(contract.contractId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${contract.contractId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.contractService.disable(contract.contractId).subscribe((res: any) => {
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
  get f() { return this.frmContract.controls; }

}
