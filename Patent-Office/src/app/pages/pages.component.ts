import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';

declare let App: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit, AfterViewInit {
  public menuItem: any[];

  constructor(_sidebarService: SidebarService) {
    this.menuItem = _sidebarService.menu;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    App.init();
  }
}
