import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setApiKey(apiKey: string) {
    sessionStorage.setItem('apiKey', apiKey);
  }

  getApiKey(): string | null {
    return sessionStorage.getItem('apiKey');
  }

  setIsValid(isValid: string) {
    sessionStorage.setItem('isValid', isValid);
  }

  getIsValid(): string | null {
    return sessionStorage.getItem('isValid');
  }
}
