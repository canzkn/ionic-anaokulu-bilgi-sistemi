import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { ConstantService } from '../constant/constant.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>([]);

  constructor( 
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private constantService: ConstantService) { }

  // kayıt ol
  signup(postData: any): Observable<any> {
    return this.http.post(this.constantService.API_URL + 'register', postData);
  }

  // giriş yap
  login(postData: any): Observable<any>
  {
    return this.http.post(this.constantService.API_URL + 'login', postData);
  }

  // çıkış yap
  logout() {
    this.storageService.removeData(this.constantService.AUTH).then(res => {
      this.userData$.next('');
      this.router.navigate(['login']);
    });
  }

  // giriş yapan kullanıcıyı getir
  getLogged()
  {
    this.storageService.getData(this.constantService.AUTH).then(
      res => {
        this.userData$.next(res);
      }
    )
  }
}
