import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(uri: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url     = environment.apiUrl + uri;

    return this.http.post(url, data, options);
  }
}
