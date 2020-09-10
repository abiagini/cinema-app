import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(
    public  router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  register() {

    if (this.registerForm.valid) {
      this.loadingService.presentLoading('Loading');

      this.authService.register(this.registerForm.value).subscribe((response: any) => {
        this.toastService.presentToast("You have registered to our awesome cinema app, you will redirected to login page!");
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      }, (error: any) => {
        if (error.status && error.status == 422) {
          this.presentErrors(error);
        }
      });

      return;
    }

    return this.toastService.presentToast("Correct the marked inputs!");
  }

  private presentErrors(error: any) {
    const errors = error.error.errors;

    if (errors.name) {
      this.toastService.presentToast(errors.name[0]);
    }
    if (errors.email) {
      this.toastService.presentToast(errors.email[0]);
    }
    if (errors.password) {
      this.toastService.presentToast(errors.password[0]);
    }
  }

  name() {
    return this.registerForm.get('name');
  }

  email() {
    return this.registerForm.get('email');
  }

  password() {
    return this.registerForm.get('password');
  }

}
