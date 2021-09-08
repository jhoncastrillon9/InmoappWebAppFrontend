import * as CryptoJS from 'crypto-js';

import { Injectable } from '@angular/core';
import * as SecureStorage from 'secure-web-storage';
import { environment } from 'src/environments/environment';
const SECRET_KEY = environment.APP_ID;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public secureStorageSession = new SecureStorage(sessionStorage, {
    // tslint:disable-next-line: typedef
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    // tslint:disable-next-line: typedef
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    // tslint:disable-next-line: typedef
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  });

  public secureStorageLocal = new SecureStorage(localStorage, {
    // tslint:disable-next-line: typedef
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    // tslint:disable-next-line: typedef
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    // tslint:disable-next-line: typedef
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  });

}
