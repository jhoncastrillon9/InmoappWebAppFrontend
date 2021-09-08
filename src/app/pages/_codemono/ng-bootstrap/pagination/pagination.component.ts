import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // Basic Pagination
  page1 = 4;

  // Advanced Pagination
  page2 = 5;

  // Pagination Size
  currentPage = 3;

  // tslint:disable-next-line: typedef
  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'][current - 1];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
