import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  // API URL
  API_URL = 'http://canozkan.net/ilkadim/'

  // TOKEN
  AUTH = 'userData'

  constructor() { }
}
