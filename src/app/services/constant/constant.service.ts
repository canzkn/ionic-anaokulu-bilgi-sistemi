import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  // API URL
  API_URL = 'http://localhost/okulApi/'

  // TOKEN
  AUTH = 'userData'

  constructor() { }
}
