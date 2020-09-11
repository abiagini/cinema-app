import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  movie: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private toastService: ToastService,
    private movieService: MovieService,
    public router: Router
  ) { }

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovie(movieId);
  }

  ionViewWillEnter() {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovie(movieId);
  }

  async getMovie(movieId: string) {
    const token = await this.storageService.get('access_token');

    this.movieService.show(movieId, token).subscribe((response: any) => {
      if (response) {
        this.movie = response;
      }
    }, (error: any) => {
      this.toastService.presentToast("Something went wrong!");
    });

  }

}
