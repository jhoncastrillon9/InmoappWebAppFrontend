import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.scss']
})
export class TableListingComponent implements OnInit {
  //  Pagination
  page = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}
