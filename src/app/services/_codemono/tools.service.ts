import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
// import {  ntPosicion, ntTipo } from 'src/app/helpers/app.core.helper';

declare var $: any;
declare var jQuery: any;
declare var iziToast: any;

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  public sideNavState$: Subject<boolean> = new Subject();

  closeResult: string;
  constructor(private modalService: NgbModal, private router: Router) {}

  // tslint:disable-next-line: typedef
  convertirArregloPH(array: any) {
    const map = {};
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      obj.submenu = [];
      map[obj.ModuloId] = obj;
      const parent = obj.PadreId || '-';
      if (!map[parent]) {
        map[parent] = {
          submenu: [],
        };
      }
      map[parent].submenu.push(obj);
    }
    return map['-'].submenu;
  }

  // tslint:disable-next-line: typedef
  setPortafolioId(PortafolioId: string) {
    sessionStorage.setItem('p', window.btoa(PortafolioId));
  }

  // tslint:disable-next-line: typedef
  getPortafolioId() {
    return window.atob(sessionStorage.getItem('p'));
  }

  // tslint:disable-next-line: typedef
  groupBy(collection, property) {
    let i = 0;
    let val;
    let index;
    const values = [];
    const result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) {
        result[index].push(collection[i]);
      } else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  // tslint:disable-next-line: typedef
  groupByCustom(collection, property) {
    let i = 0;
    let val;
    let index;
    const values = [];
    const result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) {
        result[index].push([collection[i]]);
      } else {
        values.push(val);
        result.push( [collection[i]]);
      }
    }
    return result;
  }

  // tslint:disable-next-line: typedef
  openModal(content, sizeModal: string = '') {
    let options: NgbModalOptions;
    switch (sizeModal) {
      case 'sm':
        options = {
          size: 'sm',
        };
        break;
      case 'lg':
        options = {
          size: 'lg',
        };
        break;
      case 'xl':
        options = {
          size: 'xl',
        };
        break;
      case 'xxl':
        options = {
          windowClass: 'xxlModal'
        };
        break;
      default:
        options = {};
        break;
    }
    this.modalService.open(content, options).result.then(
      (result) => {
        this.closeResult = `Cerrado`;
      },
      (reason) => {}
    );
  }

  // tslint:disable-next-line: typedef
  closeModal() {
    this.modalService.dismissAll();
  }

  // tslint:disable-next-line: typedef
  getCurrentRoute() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        sessionStorage.setItem('route', event.url);
        return event.url;
      }
    });
  }

  // tslint:disable-next-line: typedef
  // notificacion(texto: any, tipo: ntTipo, posicion: ntPosicion, tiempo: number = 3000) {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: posicion,
  //     showConfirmButton: false,
  //     timer: tiempo,
  //     timerProgressBar: true,
  //     onOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer);
  //       toast.addEventListener('mouseleave', Swal.resumeTimer);
  //     },
  //   });

  //   return Toast.fire({
  //     icon: tipo,
  //     title: `${texto}`,
  //   });
  // }

  // tslint:disable-next-line: typedef
  openSidebar(value: boolean){
    console.log(value);
    return value;
  }

  // Date format input > 2021-12-25 - Date format ouput > 25-12-2021
  /*dateFormat(value: string): string {
    const DELIMITER = '-';

    const year = value.substring(0, 4);
    const mouth = value.substring(5, 7);
    const day = value.substring(8, 10);

    const outDate = `${year}${DELIMITER}${mouth}${DELIMITER}${day}`;

    return outDate;
  }*/
}
