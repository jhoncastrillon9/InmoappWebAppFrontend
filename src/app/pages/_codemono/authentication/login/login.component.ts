import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/_codemono/authentication.service';
import { ThemeService } from 'src/app/services/_codemono/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Variables
  frmLogin: FormGroup;
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
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.frmLogin.invalid) {

      const form = document.getElementsByClassName('container-form')[0] as HTMLFormElement;
      form.classList.add('was-validated');

      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.frmLogin.controls.username.value, this.frmLogin.controls.password.value)
      .then(() => {
        setTimeout(() => {
          this.router.navigate(['/start']);
        }, 1000);
      }).catch((error) => {
        Swal.fire('Wrong username o password', 'Try again', 'error');
        this.loading = false;
        this.error = error;
        this.cd.detectChanges();
      });
  }
}
