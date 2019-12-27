import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Set store data
  async setData(key: string, value: any) {
    const hashedVal = btoa(escape(JSON.stringify(value)));
    const res = await this.storage.set(key, hashedVal);
  }

  // Get stored data
  async getData(key: string) {
    const keyVal = await this.storage.get(key);
    return JSON.parse(unescape(atob(keyVal)));
  }

  // Remove item from store
  async removeData(key: string)
  {
    await this.storage.remove(key)
  }

  // Clear storage
  async clearStore()
  {
    await this.storage.clear();
  }
}
