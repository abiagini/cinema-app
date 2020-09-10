import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(private loadingController: LoadingController) { }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message
    });
    this.loading.present();
  }

  async dismiss() {
    this.loading.dismiss();
  }
}
