import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpSerivice: HttpService
  ) { }

  login(data: any): Observable<any> {
    return this.httpSerivice.post('/auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.httpSerivice.post('/auth/register', data);
  }
}
