import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Invention } from 'src/app/models/invention.model';
import { InventionService } from 'src/app/services/invention.service';

@Component({
  selector: 'app-invention',
  templateUrl: './invention.component.html',
  styleUrls: ['../../../assets/css/widget.css']
})
export class InventionComponent implements OnInit, AfterViewInit {
  public pageSize: number;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Invention>;
  public inventions: Invention[];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _inventionService: InventionService) {
    this.pageSize = 6;
    this.dataSource = new MatTableDataSource<Invention>();
    this.displayedColumns = ['name', 'year', 'country', 'actions'];
    this.inventions = [];
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = this.inventions;
    await this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private async getData(): Promise<void> {
    try {
      const data = await this._inventionService.getAll();
      if (data['code'] === 200) {
        this.inventions = data['data'];
        this.dataSource.data = this.inventions;
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

  public update(invention: Invention) {
    console.log(invention)
  }

  public delete(inventionID: number) {
    console.log(inventionID)
  }
}
