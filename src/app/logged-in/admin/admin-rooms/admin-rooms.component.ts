import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { DialogService } from '../../../shared/dialogs.service';
import { Observable } from 'rxjs';
import { AdminRoomValidatorService } from './validator.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  dataSource:TableDataSource<Room>;
  
  displayedColumns = [ 'building', 'roomNumber','actionsColumn']; 

  constructor(private adminRoomValidatorService: AdminRoomValidatorService, private dialogService: DialogService) { }

  @Input() taskList: Room[] = [
    { position: 0, building: 'Mark', roomNumber: 15 },
     { position: 1, building: 'Brad', roomNumber: 50 },
  ];

  ngOnInit() {
    this.dataSource  = new TableDataSource<Room>(this.taskList, Room,this.adminRoomValidatorService);
  }

  confirmSave(row: TableElement<Room>) {
    console.log(row);
    if (row.id == -1) {
      row.currentData.position = this.taskList.length;

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

class Room {
  position: number;
  building: string;
  roomNumber: number;
}