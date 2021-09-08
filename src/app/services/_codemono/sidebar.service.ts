import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidenavService {

    sidenav;

    // tslint:disable-next-line: typedef
    public open() {
        return this.sidenav.open();
    }

    // tslint:disable-next-line: typedef
    public close() {
        return this.sidenav.close();
    }

    public toggle(value): void {
       return value;
    }
}