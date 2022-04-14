import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';
import { ThemeService } from 'src/app/services/_codemono/theme.service';
import { RoleEmun } from 'src/app/Emuns/Users/RoleEnum';
import { extend } from 'jquery';
declare var $: any;
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
// User
currentUser: UserModel;
roleEnum = RoleEmun;
userRoles: number[];

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {

        // Load current user        
        this.currentUser = this.auth.currentUserValue;
        this.userRoles = this.currentUser.roles;   
  }

  /**
   * El metodo recibe un listado de roles en string y obtiene el ID correspondiente del role
   * por medio de la enumeración, se hace u ncruxe entre los id de los roles para determinar si el usuario 
   * Peude ingresar a ese modulo o mostrar
   * @param roles Listado de roles para ser buscados
   * @returns boolean indicando si 
   */
  containsRole(roles: string): boolean {    
    let rolesMenu = roles.split(",");
    const intersection = rolesMenu.filter(element => this.userRoles.includes(RoleEmun[element]));
    return intersection.length>0;    
  }

}
