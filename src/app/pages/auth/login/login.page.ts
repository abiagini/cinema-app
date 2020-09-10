import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public data = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.data).subscribe((response: any ) => {
      if (response.access_token) {
        this.storageService.store('access_token', response.access_token);
        this.router.navigate(['home']);
      } else {
        this.toastService.presentToast('Usuario o contraseña incorrectos!');
      }
    },
    (error: any) => {
      this.toastService.presentToast(error.error.message);
    });
  }

}
