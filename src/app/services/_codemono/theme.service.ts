import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Option configuration
const options = { navbar: 'XL', position: 'Inherit', actionbar: 'On', scheme: 'Light', color: 'Blue' };

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }

  // Load saved theme settings
  loadConfiguration(): void {
    const getOptions = localStorage.getItem('configuration');
    if(getOptions === null) { return; }
    const ouputOptions = JSON.parse(getOptions);

    // Navbar Size
    switch (ouputOptions.navbar) {
      case 'SM':
        this.navbarSM();
        break;
      case 'MD':
        this.navbarMD();
        break;
      case 'LG':
        this.navbarLG();
        break;
      case 'XL':
        this.navbarXL();
        break;
      default:
        this.navbarLG();
        break;
    }

    // Navbar Position
    switch (ouputOptions.position) {
      case 'Inherit':
        this.navbarInherit();
        break;
      case 'Sticky':
        this.navbarSticky();
        break;
      default:
        this.navbarInherit();
        break;
    }

    // Action Bar
    switch (ouputOptions.actionbar) {
      case 'On':
        this.actionBarOn();
        break;
      case 'Off':
        this.actionBarOff();
        break;
      default:
        this.actionBarOn();
        break;
    }

    // Theme Scheme
    switch (ouputOptions.scheme) {
          case 'Dark':
            this.dark();
            break;
          case 'Light':
            this.light();
            break;
          default:
            this.light();
            break;
        }

    // Theme Color
    switch (ouputOptions.color) {
          case 'Blue':
            this.blue();
            break;
          case 'Orange':
            this.orange();
            break;
          case 'Green':
            this.green();
            break;
          default:
            this.blue();
            break;
        }
  }

  // Load saved theme settings Login
  loadConfigurationLogin(): void {
    const getOptions = localStorage.getItem('configuration');
    if(getOptions === null) { return; }
    const ouputOptions = JSON.parse(getOptions);

    // Theme Scheme
    switch (ouputOptions.scheme) {
      case 'Dark':
        document.body.classList.add('dark');
        break;
      case 'Light':
        document.body.classList.remove('dark');
        break;
      default:
        document.body.classList.remove('dark');
        break;
    }

    // Theme Color
    switch (ouputOptions.color) {
      case 'Blue':
        document.body.classList.add('blue');
        break;
      case 'Orange':
        document.body.classList.add('orange');
        break;
      case 'Green':
        document.body.classList.add('green');
        break;
      default:
        this.blue();
        break;
    }
  }

  /* Functions Color Scheme */
  // Light mode
  light(): void {
    document.body.classList.remove('dark');
  }

  // Dark mode
  dark(): void {
    document.body.classList.add('dark');
  }

  /* Functions Color Theme */
  // Blue theme
  blue(): void {
    document.body.classList.remove('orange');
    document.body.classList.remove('green');

    // load shadow color
    this.shadowBlue();
  }

  // Orange theme
  orange(): void {
    document.body.classList.remove('green');
    document.body.classList.add('orange');

    // load shadow color
    this.shadowOrange();
  }

  // Green Theme
  green(): void {
    document.body.classList.remove('orange');
    document.body.classList.add('green');

    // load shadow color
    this.shadowGreen();
  }

  /* Funtions Navbar Sizes */
  // Small
  navbarSM(): void {
    const element = document.getElementById('navbar');
    // Remove class size nav
    element.classList.remove('navbar-md');
    element.classList.remove('navbar-lg');
    element.classList.remove('navbar-xl');

    // Add clas size nav
    element.classList.add('navbar-sm');
  }

  // Medium
  navbarMD(): void {
    const element = document.getElementById('navbar');

    // Remove class size nav
    element.classList.remove('navbar-sm');
    element.classList.remove('navbar-lg');
    element.classList.remove('navbar-xl');

    // Add clas size nav
    element.classList.add('navbar-md');
  }

  // Large
  navbarLG(): void {
    const element = document.getElementById('navbar');

    // Remove class size nav
    element.classList.remove('navbar-sm');
    element.classList.remove('navbar-md');
    element.classList.remove('navbar-xl');

    // Add clas size nav
    element.classList.add('navbar-lg');
  }

  // Large
  navbarXL(): void {
    const element = document.getElementById('navbar');

    // Remove class size nav
    element.classList.remove('navbar-sm');
    element.classList.remove('navbar-md');
    element.classList.remove('navbar-lg');

    // Add clas size nav
    element.classList.add('navbar-xl');
  }

  /* Navbar Position */
  // Inherit Navbar Position
  navbarInherit(): void {
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('sticky-top');
    navbar.classList.remove('nav-shadow');
  }

  // Sticky Navbar Position
  navbarSticky(): void {
    const navbar = document.getElementById('navbar');
    navbar.classList.add('sticky-top');
    navbar.classList.add('nav-shadow');
  }

  /* Action Bar Options */
  // On Action Bar
  actionBarOn(): void {
    const actionbar = document.getElementById('actionbar');
    actionbar.classList.replace('hide-action-bar', 'show-action-bar');
  }

  // Off Action Bar
  actionBarOff(): void {
    const actionbar = document.getElementById('actionbar');
    actionbar.classList.replace('show-action-bar', 'hide-action-bar');
  }

  /* shadow Colors */
  // shadow Blue Color
  shadowBlue(): void {
    const color = document.getElementById('custom-circle');
    color.classList.remove('shadow-orange');
    color.classList.remove('shadow-green');
    color.classList.add('shadow-blue');
  }

  // shadow Orange Color
  shadowOrange(): void {
    const color = document.getElementById('custom-circle');
    color.classList.remove('shadow-blue');
    color.classList.remove('shadow-green');
    color.classList.add('shadow-orange');
  }

  // shadow Green Color
  shadowGreen(): void {
    const color = document.getElementById('custom-circle');
    color.classList.remove('shadow-blue');
    color.classList.remove('shadow-orange');
    color.classList.add('shadow-green');
  }
}
