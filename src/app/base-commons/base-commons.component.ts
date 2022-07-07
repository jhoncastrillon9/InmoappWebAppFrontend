import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { messages } from '../static/messages';

@Component({
  selector: 'app-base-commons',
  templateUrl: './base-commons.component.html',
  styleUrls: ['./base-commons.component.scss']
})
export class BaseCommonsComponent implements OnInit {




  constructor(public router: Router) {

  }

  ngOnInit(): void {
  }

  public validateRequestCreated(res: any, path: string) {
    //console.log(res);
    if (res.data[0].errorId !== 0) {
      this.showAlertError(res.data[0].message);
      return;
    }
    this.showAlertSuccess(path);
  }

  public validateRequestEdit(res: any, path: string) {
    if (res.data[0].errorId !== 0) {
      Swal.fire(messages.tittleUpsBad, res.data[0].message, 'error');
      return;
    }

    Swal.fire('Proceso exitoso', 'El registro se ha editado exitosamente', 'success').then(() => {
      this.router.navigate([path]);
    });
  }

  public validateRequestDelete(res: any) {
    // console.log(res);
    if (res.data[0].errorId !== 0) {
      this.showAlertError(res.data[0].message);
      return;
    }

    Swal.fire('Delete', 'Record deleted', 'success').then(() => {
      this.load();
    });
  }


  getDateToday() {
    const now = new Date()
    const month = (date) => {
      const m = date.getMonth() + 1;
      if (m.toString().length === 1) {
        return `0${m}`;
      } else {
        return m;
      }
    };
    const day = (date) => {
      const d = date.getDate();
      if (d.toString().length === 1) {
        return `0${d}`;
      } else {
        return d;
      }
    };

    const formattedDate = `${now.getFullYear()}-${month(now)}-${day(now)}`

    return formattedDate;
  }


  ////*************************FOR OVERRIDE***************************/////
  load(): void {

  }






  ////*************************SHOW ALERTS***************************/////

  public showAlertError(textError: string) {
    Swal.fire('¡Ups! Algo salió mal', textError, 'error');
  }


  public showAlertSuccess(path: string) {

    Swal.fire('Proceso exitoso', 'Se ha creado el registro exitosamente', 'success').then(() => {
      this.router.navigate([path]);
    });
  }

  public showAlertErrorFields() {

    Swal.fire(
      '¡Ups!',
      'Por favor completa los campos requeridos',
      'error'
    );
  }

  public showAlertGeneralError(err: any) {
    // console.log(err);
    Swal.fire('¡Ups! Algo salió mal', 'Pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.', 'error');
  }


  public createAlertDelete(entityName: string, name: string): SweetAlertOptions<any, any> {
    return {
      html: `<h4>¿Estas seguro de <strong><u>Eliminar</u></strong> este ${entityName}?</h4>  <br>
        <strong>No podras recuperar el ${entityName} ${name}</strong>`,
      // icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
    };
  }




}
