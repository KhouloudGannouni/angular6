import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient: HttpClient) { }
  getConfig() {
    return this.httpClient.get('assets/data/config.json');
  }
}
