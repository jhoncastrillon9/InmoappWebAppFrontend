import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';
import { AccountsStatusService } from 'src/app/services/Banks/accounts-status.service';
import { messages } from 'src/app/static/messages';




@Component({
  selector: 'app-accounts-status-list',
  templateUrl: './accounts-status-list.component.html',
  styleUrls: ['./accounts-status-list.component.scss']
})

export class AccountsStatusListComponent implements OnInit {

  // load AccountsStatuss
  accountsStatuss: any[] = [];
  accountsStatus: AccountsStatusModel;

  // Filter
  frmFilter: FormGroup;
  accountsStatusFilter = new AccountsStatusModel();
  showFiller = false;


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private accountsStatusService: AccountsStatusService,
    private cd: ChangeDetectorRef,
    
    private formBuilder: FormBuilder) {
    this.createForm();

    
  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      accountsStatusId: new FormControl(null),
      accountsStatusName: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.accountsStatuss = [];

    this.accountsStatusService.getAll(this.accountsStatusFilter).subscribe(
      (res: any) => {
        this.accountsStatuss = res.data;
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


  changeStatus(status: boolean, accountsStatus: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${accountsStatus.accountsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsStatusService.enable(accountsStatus.accountsStatusId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${accountsStatus.accountsStatusId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsStatusService.disable(accountsStatus.accountsStatusId).subscribe((res: any) => {
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


  delete(accountsStatus: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${accountsStatus.accountsStatusId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.accountsStatusService.delete(accountsStatus.accountsStatusId).subscribe((res: any) => {
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
    this.accountsStatusFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.accountsStatusFilter = new AccountsStatusModel();
    this.frmFilter.reset();
    this.load();
  }




}






