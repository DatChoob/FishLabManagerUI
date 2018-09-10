import { Room } from './../../../shared/models/room';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  dataSource: TableDataSource<Room>;

  displayedColumns = ['building', 'roomNumber', 'actionsColumn'];

  constructor(private dialogService: DialogService) { }

  @Input() taskList: Room[] = [
    { id: 0, building: 'Mark', roomNumber: 15 },
    { id: 1, building: 'Brad', roomNumber: 50 },
  ];

  ngOnInit() {
    this.dataSource = new TableDataSource<Room>(this.taskList, Room);
  }

  confirmSave(row: TableElement<Room>) {
    if (row.validator.valid) {
      console.log(row);
      if (row.id == -1) {
        row.currentData.id = this.taskList.length;

        // we are creating a new row
      } else {
        //we are editing a row
      }
      row.confirmEditCreate();
    }
  }


  cancelOrDelete(row: TableElement<Room>) {
    if (!row.editing) {
      console.log(row);
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          console.log('The dialog was closed');
          row.cancelOrDelete();
        }
      });
    } else {
      row.cancelOrDelete();

    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}