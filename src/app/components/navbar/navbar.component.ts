import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';
import { ThemeService } from 'src/app/services/_codemono/theme.service';
import { RoleEmun } from 'src/app/Emuns/Users/RoleEnum';
import { BaseComponent } from 'src/app/base/base.component';
import { extend } from 'jquery';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {

  @Output() sidebar = new EventEmitter<boolean>();
  @Output() option = new EventEmitter<boolean>();

  

  // MediaMatcher
  mediaQuery: MediaQueryList;
  mediaQueryListener: () => void;

  // SideBars
  toggleActiveSidebar = false;
  toggleActiveOption = false;

  // tslint:disable-next-line: max-line-length
  constructor(changeDetectorRef: ChangeDetectorRef, public auth: AuthenticationService, mediaMatcher: MediaMatcher, public theme: ThemeService) {
    super(auth);
    this.mediaQuery = mediaMatcher.matchMedia('(min-width: 991px)');

    this.mediaQueryListener = () => {
      changeDetectorRef.detectChanges();
    };

    this.mediaQuery.addListener(this.mediaQueryListener);
  }

  openSidebar(): void {
    this.toggleActiveSidebar = true;
    this.sidebar.emit(this.toggleActiveSidebar);
    // $('.nav-menu').addClass('active');
  }

  openOptions(): void {
    this.toggleActiveOption = true;
    this.option.emit(this.toggleActiveOption);
  }

  ngOnInit(): void {
    // Load options theme
    setTimeout(() => {
      this.theme.loadConfiguration();
    }, 50);

    super.ngOnInit();
  }

/**
 * Salir
 */
  signOut(): void{
    this.auth.logout();
  }
}
