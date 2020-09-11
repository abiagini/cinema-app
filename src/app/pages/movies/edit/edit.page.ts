import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public movieForm: FormGroup;
  public movie: any;

  constructor(
    public router: Router,
    public movieService: MovieService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovie(movieId);

    this.movieForm = this.formBuilder.group({
        title: new FormControl('', [
          Validators.required
        ]),
        description: new FormControl('', [
          Validators.required
        ]),
        image_url: new FormControl('', [
          Validators.required,
        ])
      });
  }

  title() {
    return this.movieForm.get('title');
  }

  description() {
    return this.movieForm.get('description');
  }

  rating() {
    return this.movieForm.get('rating');
  }

  imageUrl() {
    return this.movieForm.get('image_url');
  }

  async getMovie(movieId: string) {
    this.loadingService.presentLoading('Loading');
    const token = await this.storageService.get('access_token');

    this.movieService.show(movieId, token).subscribe((response: any) => {
      if (response) {
        this.movie = response;
        this.title().setValue(this.movie.title);
        this.description().setValue(this.movie.description);
        this.imageUrl().setValue(this.movie.image_url);
        this.loadingService.dismiss();
      }

    }, (error: any) => {
      this.toastService.presentToast("Something went wrong!");
      this.loadingService.dismiss();
    });
  }

  async update() {

    if (this.movieForm.valid) {
      this.loadingService.presentLoading('Loading');
      const token = await this.storageService.get('access_token');


      this.movieService.update(this.movie.id, this.movieForm.value, token).subscribe((response: any) => {
        this.loadingService.dismiss();
        this.router.navigate(['movies', this.movie.id],);
      }, (error: any) => {
        if (error.status && error.status == 422) {
          this.loadingService.dismiss();
          this.presentErrors(error);
        }
      });

      return;

    }


    return this.toastService.presentToast("Correct the marked inputs!");
  }

  private presentErrors(error: any) {
    const errors = error.error.errors;

    if (errors.title) {
      this.toastService.presentToast(errors.title[0]);
    }
    if (errors.description) {
      this.toastService.presentToast(errors.description[0]);
    }
    if (errors.rating) {
      this.toastService.presentToast(errors.rating[0]);
    }
    if (errors.image_url) {
      this.toastService.presentToast(errors.image_ur[0]);
    }
  }

}
