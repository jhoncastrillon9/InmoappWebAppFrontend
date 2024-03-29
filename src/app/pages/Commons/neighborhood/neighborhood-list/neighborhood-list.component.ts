import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { NeighborhoodModel } from 'src/app/models/Commons/neighborhood.model';
import { NeighborhoodService } from 'src/app/services/Commons/neighborhood.service';

import { ZoneModel } from 'src/app/models/Commons/zone.model';

import { ZoneService } from 'src/app/services/Commons/zone.service';
import { messages } from 'src/app/static/messages';


@Component({
  selector: 'app-neighborhood-list',
  templateUrl: './neighborhood-list.component.html',
  styleUrls: ['./neighborhood-list.component.scss']
})

export class NeighborhoodListComponent implements OnInit {

  // load Neighborhoods
  neighborhoods: any[] = [];
  neighborhood: NeighborhoodModel;

  // Filter
  frmFilter: FormGroup;
  neighborhoodFilter = new NeighborhoodModel();
  showFiller = false;
  zoneList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private neighborhoodService: NeighborhoodService,
    private cd: ChangeDetectorRef,
        private zoneService: ZoneService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.zoneService.getList(new ZoneModel()).subscribe((res: any) => {
      this.zoneList = res.data;
    });

  }


  ngOnInit(): void {
    
    this.load();
  }


  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      neighborhoodId: new FormControl(null),
      neighborhoodName: new FormControl(null),
      zoneId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.neighborhoods = [];

    this.neighborhoodService.getAll(this.neighborhoodFilter).subscribe(
      (res: any) => {
        this.neighborhoods = res.data;
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


  changeStatus(status: boolean, neighborhood: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${neighborhood.neighborhoodId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.neighborhoodService.enable(neighborhood.neighborhoodId).subscribe((res: any) => {
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
        <br> <strong>Registro # ${neighborhood.neighborhoodId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.neighborhoodService.disable(neighborhood.neighborhoodId).subscribe((res: any) => {
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


  delete(neighborhood: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> esto?</h4>  <br>
        <strong>No podras recuperar el registro # ${neighborhood.neighborhoodId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.neighborhoodService.delete(neighborhood.neighborhoodId).subscribe((res: any) => {
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
    this.neighborhoodFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.neighborhoodFilter = new NeighborhoodModel();
    this.frmFilter.reset();
    this.load();
  }




}






