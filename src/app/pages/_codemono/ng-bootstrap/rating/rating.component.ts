import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  // Basic demo
  currentRate1 = 8;

  // Events and readonly ratings
  selected = 0;
  hovered = 0;
  readonly = false;

  // Custom star template
  currentRate2 = 6;

  // Form integration
  ctrl = new FormControl(null, Validators.required);

  constructor() { }

  // Form integration
  toggle(): void {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
}
