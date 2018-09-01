import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

import { TableDataSource, ValidatorService, TableElement } from 'angular4-material-table';
import { PersonValidatorService } from './validator.service';
@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  constructor(private personValidator: PersonValidatorService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() taskList:Person[] = [
    { index: 0, name: 'Mark', age: 15 },
    { index: 1, name: 'Brad', age: 50 },
  ];

  dataSource: TableDataSource<Person>;
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.taskList, Person, this.personValidator);

    this.dataSource.datasourceSubject.subscribe(taskList => {
      console.log(taskList);

    });
  }

  confirmSave(row: TableElement<any>) {
    console.log(this.taskList);
    console.log(row);
    if (row.id == -1) {
      row.currentData.index=this.taskList.length;
      
      // we are creating a new row
    } else {
      //we are editing a row
    }
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<any>) {
    console.log(row);
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
    }
    row.cancelOrDelete();
  }
}

class Person {
  index:number;
  name: string;
  age: number;
}
