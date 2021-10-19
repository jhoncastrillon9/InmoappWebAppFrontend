import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';
import { ThemeService } from 'src/app/services/_codemono/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Variables
  frmRegister: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    public theme: ThemeService) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValueAcceso) {
      this.router.navigate(['/inicio']);
    }
    this.createForm();
  }


  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    setTimeout(() => {
      this.theme.loadConfigurationLogin();
    }, 50);
  }

  createForm(): void {
    this.frmRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(4), Validators.max(20)]],
      confirmPassword: ['', [Validators.required, Validators.min(4), Validators.max(20), this.validatePassword]],
    });
  }

  private validatePassword(control: AbstractControl) {
    const password = control.value;
    const comfirmPassword = this.frmRegister.get('password');
    let error = null;
    if (password != comfirmPassword) {
      error = { ...error, dollar: 'needs a dollar symbol' };
    }
    return error;
  }

  onSubmit(): void {
    const em = this.frmRegister.get('email');
    console.log(em);
    if (this.frmRegister.invalid) {

      const form = document.getElementsByClassName('container-form')[0] as HTMLFormElement;
      form.classList.add('was-validated');

      return;
    }



    const newUser = new UserModel();
    newUser.email = this.frmRegister.controls.email.value;
    newUser.username = this.frmRegister.controls.email.value; //Por ahora el nombre de usuario es igual al email 
    newUser.companyName = this.frmRegister.controls.companyName.value;
    newUser.firstName = this.frmRegister.controls.firstName.value;
    newUser.lastName = "";
    newUser.password = this.frmRegister.controls.password.value;


    this.loading = true;
    this.authenticationService
      .register(newUser)
      .then(() => {
        setTimeout(() => {
          this.router.navigate(['/start']);
        }, 1000);
      }).catch((error) => {
        Swal.fire('Uppp!!', 'Parece que tenemos problemas, intenta de nuevo', 'error');
        this.loading = false;
        this.error = error;
        this.cd.detectChanges();
      });
  }

}
