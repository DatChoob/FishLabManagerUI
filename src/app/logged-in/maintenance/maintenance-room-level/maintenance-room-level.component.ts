import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MaintenanceRoomService } from '../../../shared/api-services/maintenance-room.service';
import { DialogService } from '../../../shared/dialogs.service';
import { Observable } from 'rxjs';
import { RoomMaintenance } from '../../../shared/models/roomMaintenance';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-maintenance-room-level',
  templateUrl: './maintenance-room-level.component.html',
  styleUrls: ['./maintenance-room-level.component.css']
})
export class MaintenanceRoomLevelComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Input() roomId;
  
  constructor(private readonly route: ActivatedRoute, private dialogService: DialogService, 
    private maintenanceRoomService: MaintenanceRoomService, public authService:AuthService, private snackBar: MatSnackBar,) { }

  displayedColumns = ['taskName', 'user', 'date', 'toggle'];
  dataSource: MatTableDataSource<RoomMaintenance>;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //triggered every time the url changes
      // (+) before `params.get()` turns the string into a number
      this.roomId = +params.get("roomId");
      if (this.roomId) {
        this.maintenanceRoomService.getRoomTasksByRoomId(this.roomId).subscribe(
          tasksForSelectedRoom => {
            this.dataSource = new MatTableDataSource(tasksForSelectedRoom);
            this.dataSource.sort = this.sort;
          }
        )
      }
    })
  }

  changeStatus(row:RoomMaintenance, disabled:boolean, event) {
    event.preventDefault();
    if(!disabled)
    {
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          row.status = 'Completed'
          this.snackBar.open(" Task Saved", "", { duration: 1000 });
          this.maintenanceRoomService.updateRowInformation(row)
          .subscribe(maintenanceList => console.log(maintenanceList))
        }
        
      });
    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
