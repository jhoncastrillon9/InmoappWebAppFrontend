import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { CityModel } from 'src/app/models/Commons/city.model';
import { CityService } from 'src/app/services/Commons/city.service';

import { StateModel } from 'src/app/models/Commons/state.model';

import { StateService } from 'src/app/services/Commons/state.service';
import { messages } from 'src/app/static/messages';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})

export class CityListComponent implements OnInit {

  // load Citys
  citys: any[] = [];
  city: CityModel;

  // Filter
  frmFilter: FormGroup;
  cityFilter = new CityModel();
  showFiller = false;
  stateList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private cityService: CityService,
    private cd: ChangeDetectorRef,
        private stateService: StateService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.stateService.getList(new StateModel()).subscribe((res: any) => {
      this.stateList = res.data;
    });

  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      cityId: new FormControl(null),
      cityName: new FormControl(null),
      stateId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.citys = [];

    this.cityService.getAll(this.cityFilter).subscribe(
      (res: any) => {
        this.citys = res.data;
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


  changeStatus(status: boolean, city: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${city.cityId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.cityService.enable(city.cityId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${city.cityId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.cityService.disable(city.cityId).subscribe((res: any) => {
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


  delete(city: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${city.cityId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.cityService.delete(city.cityId).subscribe((res: any) => {
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
    this.cityFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.cityFilter = new CityModel();
    this.frmFilter.reset();
    this.load();
  }




}






