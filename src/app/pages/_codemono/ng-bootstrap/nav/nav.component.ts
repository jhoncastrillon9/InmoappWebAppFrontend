import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // Basic Navs
  active1 = 1;

  // Alternative markup
  active2 = 1;

  // Vertical pills
  active3 = 'top';

  constructor() { }

  ngOnInit(): void {
  }

}
