import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { PaymentTypeService } from 'src/app/services/Banks/payment-type.service';

import { CompanyModel } from 'src/app/models/Companies/company.model';

import { CompanyService } from 'src/app/services/Companies/company.service';
import { messages } from 'src/app/static/messages';


@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.scss']
})

export class PaymentTypeListComponent implements OnInit {

  // load PaymentTypes
  paymentTypes: any[] = [];
  paymentType: PaymentTypeModel;

  // Filter
  frmFilter: FormGroup;
  paymentTypeFilter = new PaymentTypeModel();
  showFiller = false;
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private paymentTypeService: PaymentTypeService,
    private cd: ChangeDetectorRef,
        private companyService: CompanyService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.companyService.getList(new CompanyModel()).subscribe((res: any) => {
      this.companyList = res.data;
    });

  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      paymentTypeId: new FormControl(null),
      paymentTypeName: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.paymentTypes = [];

    this.paymentTypeService.getAll(this.paymentTypeFilter).subscribe(
      (res: any) => {
        this.paymentTypes = res.data;
      },
      (err) => { 
        //console.log(err);
        Swal.fire(messages.tittleUpsBad, messages.dontWorryEgain, 'error');
      },
      () => {
        this.showLoading = false;
      }
    );
  }


  // Filter sidebar
  openFilter(status: boolean): void {
    this.showFiller = status;
  }


  changeStatus(status: boolean, paymentType: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.enable(paymentType.paymentTypeId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.load();
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
        <br> <strong>Registro # ${paymentType.paymentTypeId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.disable(paymentType.paymentTypeId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.load();
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


  delete(paymentType: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${paymentType.paymentTypeId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.paymentTypeService.delete(paymentType.paymentTypeId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
              return;
            }

            Swal.fire('Delete', 'Record deleted', 'success').then(() => {
              this.load();
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


  // Searh register
  searchList(): void {
    this.paymentTypeFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.paymentTypeFilter = new PaymentTypeModel();
    this.frmFilter.reset();
    this.load();
  }




}






