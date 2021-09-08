import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent {

  constructor() { }

  time1 = { hour: 13, minute: 30 };

  meridian = true;

  // Seconds
  // tslint:disable-next-line: member-ordering
  time2: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  seconds = true;

  // Custom validation
  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return { tooEarly: true };
    }
    if (value.hour > 13) {
      return { tooLate: true };
    }

    return null;
  });


  toggleMeridian(): void {
    this.meridian = !this.meridian;
  }

  // Seconds
  // tslint:disable-next-line: typedef
  toggleSeconds() {
    this.seconds = !this.seconds;
  }
}
