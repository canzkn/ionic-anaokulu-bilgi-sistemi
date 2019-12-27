import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private authService: AuthService) { }
  
  resolve() {
    return this.authService.getLogged();
  }
}
