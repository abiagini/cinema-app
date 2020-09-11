import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies = [];

  constructor(
    private http: HttpClient
  ) { }

  all(token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    return this.http.get(environment.apiUrl + '/movies', options);
  }

  show(id: string, token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    return this.http.get(environment.apiUrl + '/movies/' + id, options);
  }

  update(id: string, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    return this.http.put(environment.apiUrl + '/movies/' + id, data, options);
  }

}
