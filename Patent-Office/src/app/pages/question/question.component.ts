import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit {
  public pageSize: number;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Question>;
  public questions: Question[];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _questionService: QuestionService) {
    this.pageSize = 6;
    this.dataSource = new MatTableDataSource<Question>();
    this.displayedColumns = ['utterance', 'survey', 'actions'];
    this.questions = [];
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = this.questions;
    await this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private async getData(): Promise<void> {
    try {
      const data = await this._questionService.getAll();
      if (data['code'] === 200) {
        this.questions = data['data'];
        this.dataSource.data = this.questions;
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

  public update(question: Question) {
    console.log(question)
  }

  public delete(questionID: number) {
    console.log(questionID)
  }
}
