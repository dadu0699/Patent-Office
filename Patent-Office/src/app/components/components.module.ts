import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Query1Component } from './query1/query1.component';
import { Query2Component } from './query2/query2.component';
import { Query3Component } from './query3/query3.component';
import { Query4Component } from './query4/query4.component';
import { Query5Component } from './query5/query5.component';
import { Query6Component } from './query6/query6.component';
import { Query7Component } from './query7/query7.component';
import { Query8Component } from './query8/query8.component';
import { Query9Component } from './query9/query9.component';
import { Query10Component } from './query10/query10.component';
import { Query11Component } from './query11/query11.component';
import { Query12Component } from './query12/query12.component';
import { Query13Component } from './query13/query13.component';
import { Query14Component } from './query14/query14.component';
import { Query15Component } from './query15/query15.component';
import { Query16Component } from './query16/query16.component';
import { Query17Component } from './query17/query17.component';
import { Query18Component } from './query18/query18.component';
import { Query19Component } from './query19/query19.component';
import { Query20Component } from './query20/query20.component';


@NgModule({
  declarations: [
    Query1Component,
    Query2Component,
    Query3Component,
    Query4Component,
    Query5Component,
    Query6Component,
    Query7Component,
    Query8Component,
    Query9Component,
    Query10Component,
    Query11Component,
    Query12Component,
    Query13Component,
    Query14Component,
    Query15Component,
    Query16Component,
    Query17Component,
    Query18Component,
    Query19Component,
    Query20Component
  ],
  exports: [
    Query1Component,
    Query2Component,
    Query3Component,
    Query4Component,
    Query5Component,
    Query6Component,
    Query7Component,
    Query8Component,
    Query9Component,
    Query10Component,
    Query11Component,
    Query12Component,
    Query13Component,
    Query14Component,
    Query15Component,
    Query16Component,
    Query17Component,
    Query18Component,
    Query19Component,
    Query20Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule
  ]
})
export class ComponentsModule { }
