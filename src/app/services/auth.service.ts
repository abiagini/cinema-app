import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpSerivice: HttpService,
    private storageService: StorageService,
    private loadingService: LoadingService
  ) { }

  login(data: any): Observable<any> {
    return this.httpSerivice.post('/auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.httpSerivice.post('/auth/register', data);
  }

  logout() {
    this.storageService.clear();
  }
}
