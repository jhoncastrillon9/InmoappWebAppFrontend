import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ModalComponent implements OnInit {

  closeResult = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  // tslint:disable-next-line: typedef
  openModalContent() {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.name = 'World';
  }


  // Modal with options
  openSm(content): void {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content): void {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content): void {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent): void {
    this.modalService.open(longContent, { scrollable: true });
  }

}
