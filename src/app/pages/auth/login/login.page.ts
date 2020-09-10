import { Component, OnInit, NgModule } from '@angular/core';
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
  public data = {
    email: '',
    password: ''
  };

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

      this.authService.login(this.data).subscribe((response: any ) => {
        if (response.access_token) {
          this.storageService.store('access_token', response.access_token);
          this.router.navigate(['home']);
        } else {
          this.toastService.presentToast("Wrong email or password!");
        }
      },
      (error: any) => {
        this.toastService.presentToast("Woops, something went wrong!");
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
