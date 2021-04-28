import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['../../../assets/css/widget.css']
})
export class CountryComponent implements OnInit, AfterViewInit {
  public pageSize: number;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Country>;
  public countries: Country[];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _countryService: CountryService) {
    this.pageSize = 6;
    this.dataSource = new MatTableDataSource<Country>();
    this.displayedColumns = ['name', 'capital',
      'population', 'area', 'region', 'actions'];
    this.countries = [];
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = this.countries;
    await this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private async getData(): Promise<void> {
    try {
      const data = await this._countryService.getAll();
      if (data['code'] === 200) {
        this.countries = data['data'];
        this.dataSource.data = this.countries;
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

  public update(country: Country) {
    console.log(country)
  }

  public delete(countryID: number) {
    console.log(countryID)
  }
}
