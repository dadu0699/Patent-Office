import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _menu: any[];

  constructor() { }

  get menu(): any[] {
    this._menu = [
      { title: 'Dashboard', icon: 'home', url: '/' },
    ];

    return this._menu;
  }
}
