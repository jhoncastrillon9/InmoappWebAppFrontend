import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/_codemono/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  // Toast
  show1 = true;

  // Closeable toast
  show2 = true;

  constructor(public toastService: ToastService) {}

  // Closeable toast
  close(): void {
    this.show2 = false;
    setTimeout(() => this.show2 = true, 3000);
  }

  // Toast management service
  showStandard(): void {
    this.toastService.show('I am a standard toast');
  }

  showSuccess(): void {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl): void {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }

}
