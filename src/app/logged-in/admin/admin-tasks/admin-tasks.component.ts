import { Component, OnInit, Input, Output } from '@angular/core';

import { TableDataSource, ValidatorService, TableElement } from 'angular4-material-table';
import { PersonValidatorService } from './validator.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../../shared/dialogs.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  constructor(private personValidator: PersonValidatorService, private dialogService: DialogService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() columnNames: string[] = ['name', 'age', 'actionsColumn'];
  @Input() taskList: Person[] = [
    { index: 0, name: 'Mark', age: 15 },
    { index: 1, name: 'Brad', age: 50 },
  ];

  dataSource: TableDataSource<Person>;
  ngOnInit() {
    this.dataSource = new TableDataSource<Person>(this.taskList, Person, this.personValidator);
  }

  confirmSave(row: TableElement<Person>) {
    console.log(row);
    if (row.id == -1) {
      row.currentData.index = this.taskList.length;

      // we are creating a new row
    } else {
      //we are editing a row
    }
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<Person>) {
    console.log(row);
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(result => {
        console.log('The dialog was closed ' + result);
      });
    }
    row.cancelOrDelete();
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }
}

class Person {
  index: number;
  name: string;
  age: number;
}
