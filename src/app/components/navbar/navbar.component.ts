import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';
import { ThemeService } from 'src/app/services/_codemono/theme.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() sidebar = new EventEmitter<boolean>();
  @Output() option = new EventEmitter<boolean>();

  // User
  currentUser: UserModel;

  // MediaMatcher
  mediaQuery;
  mediaQueryListener: () => void;

  // SideBars
  toggleActiveSidebar = false;
  toggleActiveOption = false;

  // tslint:disable-next-line: max-line-length
  constructor(changeDetectorRef: ChangeDetectorRef, public auth: AuthenticationService, mediaMatcher: MediaMatcher, public theme: ThemeService) {
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

    // Load current user
    this.currentUser = this.auth.currentUserValue;
  }

  signOut(): void{
    this.auth.logout();
  }
}
