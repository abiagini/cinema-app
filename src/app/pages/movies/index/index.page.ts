import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  movies = [];

  constructor(
    private movieService: MovieService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private storageService: StorageService,
    public router: Router
  ) { }

  ngOnInit() {
    this.all();
  }

  async all() {
    this.loadingService.presentLoading('Loading');
    const token = await this.storageService.get('access_token');

    this.movieService.all(token).subscribe((response: any) => {
      if (response) {
        this.movies = response;
        this.loadingService.dismiss();
      }
    }, (error: any) => {
      this.toastService.presentToast("Something went wrong!");
      this.loadingService.dismiss();
    });
  }

  async rate(rate: number, movieId: string) {

    this.loadingService.presentLoading('Rating');
    const token = await this.storageService.get('access_token');

    this.movieService.update(movieId, { rating: rate }, token).subscribe((response: any) => {
      this.loadingService.dismiss();
      this.toastService.presentToast("You have rated the movie with " + rate + "/5 stars!" );

      let movie = this.movies.find(movie => movie.id == movieId);
      movie.rating = rate;

    }, (error: any) => {
      if (error.status && error.status == 422) {
        this.loadingService.dismiss();
        this.toastService.presentToast("Something went wrong! " );
      }
    });

  }


}
