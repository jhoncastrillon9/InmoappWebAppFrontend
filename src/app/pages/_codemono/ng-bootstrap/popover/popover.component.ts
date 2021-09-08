import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  // HTML and bindings in popovers
  name = 'World';

  // Popover visibility events
  lastShown: Date;
  lastHidden: Date;

  constructor() { }

  ngOnInit(): void {
  }

  // Popover visibility events
  recordShown(): void {
    this.lastShown = new Date();
  }

  recordHidden(): void {
    this.lastHidden = new Date();
  }

}
