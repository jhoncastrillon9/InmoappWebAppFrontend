import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-initial',
  templateUrl: './layout-initial.component.html',
  styleUrls: ['./layout-initial.component.scss']
})
export class LayoutInitialComponent implements OnInit {

  sidebar =  false;
  option =  false;

  constructor() { }

  ngOnInit(): void {

  }
}
