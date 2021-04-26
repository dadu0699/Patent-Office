import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/region`;
  }

  public async getAll(): Promise<any> {
    return await this._httpClient.get(`${this.url}`).toPromise();
  }
}
