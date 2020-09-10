import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(key: string, value: string) {
    await Storage.set({
      key:   escape(JSON.stringify(key)),
      value: value
    });
  }

  async get(key: string) {
    const response = await Storage.get({ key: key });

    if (response.value) {
      return JSON.parse(unescape(response.value));
    }

    return false;
  }

  async remove(key: string) {
    await Storage.remove({ key: key });
  }

  async clear() {
    await Storage.clear();
  }
}
