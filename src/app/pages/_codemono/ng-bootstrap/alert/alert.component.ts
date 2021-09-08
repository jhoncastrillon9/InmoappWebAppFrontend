import { Component, OnInit, ViewChild } from '@angular/core';

// Self closing alert
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

// Closable Alert
interface Alert {
  type: string;
  message: string;
}

// Closable Alert
const ALERTS: Alert[] = [{
  type: 'bg-success text-light border-0',
  message: 'This is an success alert',
}, {
  type: 'bg-warning text-light border-0',
  message: 'This is a warning alert',
}, {
  type: 'bg-danger text-light border-0',
  message: 'This is a danger alert',
}, {
  type: 'bg-primary text-light border-0',
  message: 'This is a primary alert',
}, {
  type: 'bg-secondary text-light border-0',
  message: 'This is a secondary alert',
}, {
  type: 'bg-light text-dark border-0',
  message: 'This is a light alert',
}
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  // Closable Alert
  alerts: Alert[];

  // Self closing alert
  // tslint:disable-next-line: variable-name
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  // Self closing alert
  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor() {
    // Closable Alert
    this.reset();
  }

  // Self closing alert
  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  // Self closing alert
  public changeSuccessMessage(): void { this._success.next(`${new Date()} - Message successfully changed.`); }


  // Closable Alert
  close(alert: Alert): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset(): void {
    this.alerts = Array.from(ALERTS);
  }

}
