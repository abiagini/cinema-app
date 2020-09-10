import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;

  constructor(
    public  router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  login() {

    if (this.formGroup.valid) {
      this.loadingService.presentLoading('Loading');

      this.authService.login(this.formGroup.value).subscribe((response: any ) => {
        if (response.access_token) {
          this.storageService.store('access_token', response.access_token);
          this.router.navigate(['home']).then(() => this.loadingService.dismiss());
        } else {
          this.toastService.presentToast("Wrong email or password!");
        }
      },
      (error: any) => {

        if (error.status && (error.status == 401 || error.status == 422)) {
          return this.toastService.presentToast("Wrong email or password!");
        }

        return this.toastService.presentToast("Woops, something went wrong!");
      });

      return;
    }

    this.toastService.presentToast("Correct the inputs with errors");
  }

  email() {
    return this.formGroup.get('email');
  }

  password() {
    return this.formGroup.get('password');
  }

}
