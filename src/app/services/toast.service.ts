import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toasController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toasController.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }
}
