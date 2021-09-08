import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  // Chart Line
  dataLine = {
    labels: ['9:00 AM', '10: AM', '11 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    datasets: [
      {
        label: 'Revenues',
        data: [500.00, 900.00, 700.00, 1100, 890, 600, 900, 1250],
        fill: true,
        borderColor: '#00c54e',
        backgroundColor: [
          'rgba(29, 210, 36,  0.2)'
        ],
        borderWidth: 1,
      },
    ],
  };

  optionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
        },
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
    }
  };

  // Chart Donut
  dataDonut = {
    labels: ['Users', 'Orders', 'Items'],
    datasets: [
      {
        label: 'Revenues',
        data: [4371, 2358, 897],
        fill: true,
        borderColor: [
          '#524af2',
          '#ffc107',
          '#ff5722'
        ],
        backgroundColor: [
          '#524af2',
          '#ffc107',
          '#ff5722'
        ],
        hoverOffset: 4
      },
    ],
  };


  optionsDonut = {
    responsive: true,
    maintainAspectRatio: false,
  };

  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor() { }

  ngOnInit(): void {

  }
}
