import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { UserModel } from 'src/app/models/_codemono/user.model';
import { UserTypeModel } from 'src/app/models/_codemono/user-type.model';

import { UserService } from 'src/app/services/_codemono/user.service';
import { UserTypeService } from 'src/app/services/_codemono/user-type.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  // load users
  users: any[] = [];
  user: UserModel;
  userTypeList: any[] = [];

  // Filter
  frmFilter: FormGroup;
  userFilter = new UserModel();
  showFiller = false;

  // Loading
  showLoading = false;

  // Pagination table
  first = 0;
  rows = 10;

  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder) {
    this.createForm();

    // User Type List
    this.userTypeService.getList(new UserTypeModel()).subscribe((res: any) => {
      this.userTypeList = res.data;
    });
  }

  ngOnInit(): void {
    this.userFilter.active = null;
    this.load();
  }

  // Create Reactive Form
  createForm(): void {
    this.frmFilter = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      userTypeId: new FormControl(''),
      active: null,
    });
  }

  // Load data
  load(): void {
    this.showLoading = true;

    this.users = [];

    this.userService.getAll(this.userFilter).subscribe(
      (res: any) => {
        if (!res.e) {
          this.users = res.data;
        }
      },
      () => { },
      () => {
        this.showLoading = false;
      }
    );
  }

  // Filter sidebar
  openFilter(status: boolean): void {
    this.showFiller = status;
  }

  // Load image
  imageUrl(image: string): string {
    return ''; // `${environment.URL_REP_AVATARS}${image}`;
  }

  // Change status
  changeStatus(status: number, user: any): void {
    if (!status) {
      Swal.fire({
        // title: 'active record',
        html: `<h4>Do you want to enable this record?</h4>  <br>
        <strong>${user.firstName} ${user.lastName}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.userService.enable(user.userId).subscribe((res: any) => {
            if (!res.e) {
              Swal.fire('Record enabled', '', 'success')
                .then(
                  () => {
                    this.load();
                  }
                );
            }
          });
        }
      });
    }
    if (status) {
      Swal.fire({
        // title: 'Disable record',
        html: `<h4>Do you want to disable this record?</h4>
        <br> <strong>${user.firstName} ${user.lastName}</strong>`,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.userService.disable(user.userId).subscribe((res: any) => {
            if (!res.executionError) {
              Swal.fire('Record disabled', '', 'success')
                .then(
                  () => {
                    this.load();
                  }
                );
            }
          });
        }
      });
    }
  }

  // Delete register
  delete(user: any): void {
    if (!status) {
      Swal.fire({
        // title: 'Delete record',
        html: `<h4>Do you want to delete permanently this record?</h4> <br>
        <strong>${user.firstName} ${user.lastName}</strong>`,
        // icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          this.userService.delete(user.userId).subscribe((res: any) => {
            if (!res.executionError) {
              Swal.fire('Record deleted', '', 'success')
                .then(
                  () => {
                    this.load();
                  }
                );
            }
          });
        }
      });
    }
  }

  // Searh register
  searchList(): void {
    this.userFilter = this.frmFilter.value;
    this.load();
  }

  // Reset filters
  resetForm(): void {
    // reset model
    this.userFilter = new UserModel();
    this.frmFilter.reset();
    this.load();
  }

}
