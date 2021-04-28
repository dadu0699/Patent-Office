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
      { title: 'Paises', icon: '', url: 'country' },
      { title: 'Preguntas', icon: '', url: 'question' },
      { title: 'Inventos', icon: '', url: 'invention' },
    ];

    return this._menu;
  }
}
