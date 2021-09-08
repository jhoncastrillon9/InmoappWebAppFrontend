import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private storageService: StorageService) {}
  // Set the json data to local
  // tslint:disable-next-line: typedef
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorageSession.setItem(key, value);
  }

  // Get the json value from local
  // tslint:disable-next-line: typedef
  getJsonValue(key: string) {
    return this.storageService.secureStorageSession.getItem(key);
  }

  // Clear the local
  // tslint:disable-next-line: typedef
  clearToken() {
    return this.storageService.secureStorageSession.clear();
  }
}
