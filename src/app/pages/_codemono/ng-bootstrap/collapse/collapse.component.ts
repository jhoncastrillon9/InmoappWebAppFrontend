import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {

  // Navbar
  public isMenuCollapsed = true;

  // Collapse
  public isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
