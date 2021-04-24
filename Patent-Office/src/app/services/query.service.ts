import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/query`;
  }

  public async getQuery(report: string): Promise<any> {
    return await this._httpClient.get(`${this.url}/${report}`).toPromise();
  }
}
