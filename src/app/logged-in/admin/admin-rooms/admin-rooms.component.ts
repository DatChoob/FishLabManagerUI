import { Component, Input, Output, OnInit } from '@angular/core';
// import { PersonValidatorService } from npm i validator-service -- save;
import { TableDataSource, ValidatorService, TableElement } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {

  // constructor(private personValidator: PersonValidatorService, private dialogService: DialogService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() taskList: Rooms[] = [
    { index: 0, building: 'Humboldt', room: 115 },
    { index: 1, building: 'Humboldt', room: 119 },
    { index: 2, building: 'Humboldt', room: 123 },
  ];

  dataSource: TableDataSource<Rooms>;

  ngOnInit() {
    this.dataSource = new TableDataSource<Rooms>(this.taskList, Rooms);
  }

  confirmSave(row: TableElement<Rooms>) {
    console.log(row);
    if (row.id == -1) {
      row.currentData.index = this.taskList.length;

      // we are creating a new row
    } else {
      //we are editing a row
    }
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<Rooms>) {
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

class Rooms {
  index: number;
  building: string;
  room: number;
}

