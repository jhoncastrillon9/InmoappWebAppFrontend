import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NeighborhoodModel } from 'src/app/models/Commons/neighborhood.model';
import { ZoneModel } from 'src/app/models/Commons/zone.model';

import { NeighborhoodService } from 'src/app/services/Commons/neighborhood.service';
import { ZoneService } from 'src/app/services/Commons/zone.service';
import { messages } from 'src/app/static/messages';
import { BaseCommonsComponent } from 'src/app/base-commons/base-commons.component';

@Component({
  selector: 'app-neighborhood-form',
  templateUrl: './neighborhood-form.component.html',
  styleUrls: ['./neighborhood-form.component.scss'],
})

export class NeighborhoodFormComponent extends BaseCommonsComponent {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmNeighborhood: FormGroup;

  // validation form
  validation = false;

  // Neighborhood Model
  neighborhood = new NeighborhoodModel();
  neighborhoodId = 0;
  neighborhoodActive = true;
  zoneList: any[] = [];

  // Filter
  neighborhoodFilter = new NeighborhoodModel();

  // Loading
  showLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private zoneService: ZoneService,

    private neighborhoodService: NeighborhoodService
  ) {
    super(router);
    this.createForm();
    this.zoneService.getList(new ZoneModel()).subscribe((res: any) => {
      this.zoneList = res.data;
    });


  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.neighborhoodId = id;
        this.initForm();
      }
    });
  }



  // Reactive Form
  createForm(): void {
    this.frmNeighborhood = this.formBuilder.group({
      neighborhoodName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      zoneId: new FormControl(null, [Validators.required]),

    });
  }


  // Set data
  initForm(): void {
    this.neighborhoodService.get(this.neighborhoodId).subscribe((res: any) => {
      this.neighborhood = res.data[0];

      this.frmNeighborhood.get('neighborhoodName').setValue(this.neighborhood.neighborhoodName);
      this.frmNeighborhood.get('zoneId').setValue(this.neighborhood.zoneId);



      // Enable disable form

      if (this.neighborhoodActive) {
        this.frmNeighborhood.enable();
      }
      else {
        this.frmNeighborhood.disable();
      }

    });
  }


  saveForm() {
    if (!this.frmNeighborhood.valid) {
      // Set true validation
      this.validation = true;

      this.showAlertErrorFields();
      return;
    }

    let neighborhood: NeighborhoodModel = new NeighborhoodModel();
    neighborhood = this.frmNeighborhood.value;
    //{{SaveGetActiveValue}}
    if (this.editAction) {
      neighborhood.neighborhoodId = this.neighborhoodId;
      this.neighborhoodService.update(neighborhood).subscribe((res: any) => {
        this.validateRequestEdit(res, '/Commons/neighborhood')
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

    if (!this.editAction) {
      this.neighborhoodService.create(neighborhood).subscribe((res: any) => {
        this.validateRequestCreated(res, '');

        Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
          this.router.navigate(['/Commons/neighborhood']);
        });
      },
        (err) => {
          this.showAlertGeneralError(err);
        },
        () => {
          // Complete
        });
    }

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.frmNeighborhood.controls; }

}
