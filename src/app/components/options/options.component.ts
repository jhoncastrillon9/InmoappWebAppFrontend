import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Default Options
const options = { navbar: 'XL', position: 'Inherit', actionbar: 'On', scheme: 'Light', color: 'Blue' };

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  public OptionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadConfiguration();
  }

  // Load saved theme settings
  loadConfiguration(): void {

    if (window.localStorage.getItem('configuration') === null) {
      localStorage.setItem('configuration', JSON.stringify(options));
    }

    const getOptions = localStorage.getItem('configuration');
    const ouputOptions = JSON.parse(getOptions);

    this.OptionForm = this.formBuilder.group({
      navbar: ouputOptions.navbar,
      position: ouputOptions.position,
      actionbar: ouputOptions.actionbar,
      scheme: ouputOptions.scheme,
      color: ouputOptions.color
    });

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

    // Theme Scheme
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

  /* Functions Color Scheme */
  // Light mode
  light(): void {
    document.body.classList.remove('dark');

    // Set value to options
    options.scheme = 'Light';

    // Set configuration
    this.setConfiguration();
  }

  // Dark mode
  dark(): void {
    document.body.classList.add('dark');

    // Set value to options
    options.scheme = 'Dark';

    // Set configuration
    this.setConfiguration();
  }

  /* Functions Color Theme */
  // Blue theme
  blue(): void {
    document.body.classList.remove('orange');
    document.body.classList.remove('green');

    // load shadow color
    this.shadowBlue();

    // Set value to options
    options.color = 'Blue';

    // Set configuration
    this.setConfiguration();

  }

  // Orange theme
  orange(): void {
    document.body.classList.remove('green');
    document.body.classList.add('orange');

    // load shadow color
    this.shadowOrange();

    // Set value to options
    options.color = 'Orange';

    // Set configuration
    this.setConfiguration();
  }

  // Green Theme
  green(): void {
    document.body.classList.remove('orange');
    document.body.classList.add('green');

    // load shadow color
    this.shadowGreen();

    // Set value to options
    options.color = 'Green';

    // Set configuration
    this.setConfiguration();
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

    // Set value to options
    options.navbar = 'SM';

    // Set configuration
    this.setConfiguration();
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

    // Set value to options
    options.navbar = 'MD';

    // Set configuration
    this.setConfiguration();
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

    // Set value to options
    options.navbar = 'LG';

    // Set configuration
    this.setConfiguration();
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

    // Set value to options
    options.navbar = 'XL';

    // Set configuration
    this.setConfiguration();
  }

  /* Navbar Position */
  // Inherit Navbar Position
  navbarInherit(): void {
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('sticky-top');
    navbar.classList.remove('nav-shadow');

    // Set value to options
    options.position = 'Inherit';

    // Set configuration
    this.setConfiguration();
  }

  // Sticky Navbar Position
  navbarSticky(): void {
    const navbar = document.getElementById('navbar');
    navbar.classList.add('sticky-top');
    navbar.classList.add('nav-shadow');

    // Set value to options
    options.position = 'Sticky';

    // Set configuration
    this.setConfiguration();
  }

  /* Action Bar Options */
  // On Action Bar
  actionBarOn(): void {
    const actionbar = document.getElementById('actionbar');
    actionbar.classList.replace('hide-action-bar', 'show-action-bar');

    // Set value to options
    options.actionbar = 'On';

    // Set configuration
    this.setConfiguration();
  }

  // Off Action Bar
  actionBarOff(): void {
    const actionbar = document.getElementById('actionbar');
    actionbar.classList.replace('show-action-bar', 'hide-action-bar');

    // Set value to options
    options.actionbar = 'Off';

    // Set configuration
    this.setConfiguration();
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

  // Save theme settings
  setConfiguration(): void {
    localStorage.setItem('configuration', JSON.stringify(options));
  }

}
