import { Room } from './../../../shared/models/room';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { RoomService } from '../../../shared/api-services/room.service';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  dataSource: TableDataSource<Room>;

  displayedColumns = ['building', 'roomNumber', 'actionsColumn'];

  constructor(private dialogService: DialogService, private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.loadRooms().subscribe(rooms => {
      this.roomService.rooms.subscribe(newRooms => {
        let clone: Room[] = cloneDeep(newRooms);
        this.dataSource = new TableDataSource<Room>(clone);
      })
    });

  }

  confirmSave(row: TableElement<Room>) {
    if (row.validator.valid) 
      this.roomService.createOrUpdate(row.currentData)
      .subscribe(
        allRooms => {
          row.confirmEditCreate();
        },
        err => console.log(err));        
    }


  cancelOrDelete(row: TableElement<Room>) {
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.roomService.deleteRoom(row.currentData).subscribe(response => {});
        }
      });
    } else {
      row.cancelOrDelete();

    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }

}