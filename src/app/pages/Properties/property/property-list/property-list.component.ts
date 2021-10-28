import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { PropertyModel } from 'src/app/models/Properties/property.model';
import { PropertyService } from 'src/app/services/Properties/property.service';

import { IvaModel } from 'src/app/models/Properties/iva.model';
import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';
import { CityModel } from 'src/app/models/Commons/city.model';
import { ZoneModel } from 'src/app/models/Commons/zone.model';
import { OwnerModel } from 'src/app/models/Owners/owner.model';
import { PropertyCategoryModel } from 'src/app/models/Properties/property-category.model';
import { TypeOfferModel } from 'src/app/models/Properties/type-offer.model';
import { CompanyModel } from 'src/app/models/Companies/company.model';

import { IvaService } from 'src/app/services/Properties/iva.service';
import { PropertyStatusService } from 'src/app/services/Properties/property-status.service';
import { CityService } from 'src/app/services/Commons/city.service';
import { ZoneService } from 'src/app/services/Commons/zone.service';
import { OwnerService } from 'src/app/services/Owners/owner.service';
import { PropertyCategoryService } from 'src/app/services/Properties/property-category.service';
import { TypeOfferService } from 'src/app/services/Properties/type-offer.service';
import { CompanyService } from 'src/app/services/Companies/company.service';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit {

  // load Propertys
  propertys: any[] = [];
  property: PropertyModel;

  // Filter
  frmFilter: FormGroup;
  propertyFilter = new PropertyModel();
  showFiller = false;
  ivaList: any[] = [];
  propertyStatusList: any[] = [];
  cityList: any[] = [];
  zoneList: any[] = [];
  ownerList: any[] = [];
  propertyCategoryList: any[] = [];
  typeOfferList: any[] = [];
  companyList: any[] = [];


  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;


  constructor(
    private propertyService: PropertyService,
    private cd: ChangeDetectorRef,
        private ivaService: IvaService,
    private propertyStatusService: PropertyStatusService,
    private cityService: CityService,
    private zoneService: ZoneService,
    private ownerService: OwnerService,
    private propertyCategoryService: PropertyCategoryService,
    private typeOfferService: TypeOfferService,
    private companyService: CompanyService,

    private formBuilder: FormBuilder) {
    this.createForm();

        this.ivaService.getList(new IvaModel()).subscribe((res: any) => {
      this.ivaList = res.data;
    });
    this.propertyStatusService.getList(new PropertyStatusModel()).subscribe((res: any) => {
      this.propertyStatusList = res.data;
    });
    this.cityService.getList(new CityModel()).subscribe((res: any) => {
      this.cityList = res.data;
    });
    this.zoneService.getList(new ZoneModel()).subscribe((res: any) => {
      this.zoneList = res.data;
    });
    this.ownerService.getList(new OwnerModel()).subscribe((res: any) => {
      this.ownerList = res.data;
    });
    this.propertyCategoryService.getList(new PropertyCategoryModel()).subscribe((res: any) => {
      this.propertyCategoryList = res.data;
    });
    this.typeOfferService.getList(new TypeOfferModel()).subscribe((res: any) => {
      this.typeOfferList = res.data;
    });
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
      propertyId: new FormControl(null),
      idIva: new FormControl(null),
      code: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      address: new FormControl(null),
      reception: new FormControl(null),
      pool: new FormControl(null),
      observation: new FormControl(null),
      propertyStatusId: new FormControl(null),
      cityId: new FormControl(null),
      zoneId: new FormControl(null),
      ownerId: new FormControl(null),
      propertyCategoryId: new FormControl(null),
      typeOfferId: new FormControl(null),
      compayId: new FormControl(null),

    });
  }


    // Load data
  load(): void {
    this.showLoading = true;

    this.propertys = [];

    this.propertyService.getAll(this.propertyFilter).subscribe(
      (res: any) => {
        this.propertys = res.data;
      },
      (err) => { 
        //console.log(err);
        Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
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


  changeStatus(status: boolean, property: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Quieres activar este registro?</h4>  <br>
        <strong>Registro # ${property.propertyId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyService.enable(property.propertyId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha activado el registro', 'success').then(() => {
              this.load();
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
        <br> <strong>Registro # ${property.propertyId}</strong>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyService.disable(property.propertyId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Cambio de estado exitoso', 'Se ha desactivado el registro', 'success').then(() => {
              this.load();
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


  delete(property: any){
    if (!status) {
      Swal.fire({
        // title: '',
        html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> este registro?</h4>  <br>
        <strong>No podras recuperar el registro # ${property.propertyId}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.value) {
          this.propertyService.delete(property.propertyId).subscribe((res: any) => {
            // console.log(res);
            if (res.data[0].errorId !== 0) {
              Swal.fire('¡Ups! Algo salió mal', res.data[0].message, 'error');
              return;
            }

            Swal.fire('Delete', 'Record deleted', 'success').then(() => {
              this.load();
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


  // Searh register
  searchList(): void {
    this.propertyFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.propertyFilter = new PropertyModel();
    this.frmFilter.reset();
    this.load();
  }




}






