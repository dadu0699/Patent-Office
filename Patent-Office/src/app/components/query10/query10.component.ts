import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query10',
  templateUrl: './query10.component.html',
  styles: [
  ]
})
export class Query10Component implements OnInit, AfterViewInit {
  public pageSize: number;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;
  public data: [];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private screenHeight: number;
  private screenWidth: number;

  constructor(private _queryService: QueryService) {
    this.onResize();
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = ['inventor'];
    this.data = [];
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = this.data;
    await this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private async getData(): Promise<void> {
    try {
      const data = await this._queryService.getQuery('report-10');
      if (data['code'] === 200) {
        this.data = data['data'];
        this.dataSource.data = this.data;
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    const size = ((this.screenHeight * 0.45) / 48).toFixed()
    this.pageSize = Number(size);
  }
}
