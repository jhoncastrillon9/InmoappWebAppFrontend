import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { UserTypeModel } from 'src/app/models/_codemono/user-type.model';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { UserTypeService } from 'src/app/services/_codemono/user-type.service';
import { UserService } from 'src/app/services/_codemono/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  // Add Or Edit
  editAction = false;

  // Form Group
  frmUser: FormGroup;

  // User Model
  user = new UserModel();
  userId = 0;
  userActive = 0;
  userTypeList: any[] = [];

  // Filter
  userFilter = new UserModel();

  // Loading
  showLoading = false;

  // validation form
  validation = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public formatter: NgbDateParserFormatter,
    private userTypeService: UserTypeService
  ) {
    this.createForm();

    // User Type List
    this.userTypeService.getList(new UserTypeModel()).subscribe((res: any) => {
      this.userTypeList = res.data;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id && id > 0) {
        this.editAction = true;
        this.userId = id;
        this.initForm();
      }
    });
  }


  // Reactive Form
  createForm(): void {
    this.frmUser = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      userTypeId: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(45)])
    });
  }

  // Set data
  initForm(): void {
    this.userService.get(this.userId).subscribe((res: any) => {
      this.user = res.data[0];

      this.frmUser.get('firstName').setValue(this.user.firstName);
      this.frmUser.get('lastName').setValue(this.user.lastName);
      this.frmUser.get('userTypeId').setValue(this.user.userTypeId);
      this.frmUser.get('username').setValue(this.user.username);
      this.frmUser.get('password').setValue(this.user.password);

      // Set user active
      this.userActive = this.user.active;


      // Enable disable form
      if (this.userActive) {
        this.frmUser.enable();
      }
      else {
        this.frmUser.disable();
      }

    });
  }

   // convenience getter for easy access to form fields
   // tslint:disable-next-line: typedef
   get f() { return this.frmUser.controls; }

  // Save data
  saveForm(): void {

    // Set true validation
    this.validation = true;

    if (!this.frmUser.valid) {
      Swal.fire(
        'Error',
        'Please fill all the form',
        'error'
      );

      return;
    }

    let user: UserModel = new UserModel();
    user = this.frmUser.value;
    user.active = user.active;

    if (this.editAction) {
      user.userId = this.userId;
      this.userService.update(user).subscribe((res: any) => {
        if (res.executionError) {
          Swal.fire('Error', 'User not updated', 'error');
        }
        Swal.fire('Edit', 'User edited', 'success');
      },
        err => {
          // error
          console.log(err);
          Swal.fire('Error', 'User not created', 'error');
        },
        () => {
          // complete
          this.router.navigate(['/user']);
        });
    }

    if (!this.editAction) {
      this.userService.create(user).subscribe((res: any) => {
        if (res.executionError) {
          Swal.fire('Error', 'User not created', 'error');
        }
        Swal.fire('Create', 'User created', 'success');
      },
        err => {
          // error
          console.log(err);
          Swal.fire('Error', 'User not created', 'error');
        },
        () => {
          // complete
          this.router.navigate(['/user']);
        });
    }
  }

  // Change status
  changeStatus(status: number, user: any): void {

    this.userFilter.active = user.active;

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
            if (!res.executionError) {
              Swal.fire('Record enabled', '', 'success')
                .then(
                  () => {
                    this.initForm();
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
          <br> <strong>${this.user.firstName} ${this.user.lastName}</strong>`,
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
                    this.initForm();
                  }
                );
            }
          });
        }
      });
    }
  }

}
