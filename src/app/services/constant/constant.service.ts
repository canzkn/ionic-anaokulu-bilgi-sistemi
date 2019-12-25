import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  // API URL
  API_URL = 'http://192.168.1.22/okulApi/'

  // TOKEN
  AUTH = 'userData'

  constructor() { }
}
