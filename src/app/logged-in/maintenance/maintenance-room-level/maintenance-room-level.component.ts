import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { cloneDeep } from 'lodash';
import { MaintenanceRoomService } from '../../../shared/api-services/maintenance-room.service';
import { Maintenance } from '../../../shared/models/maintenance';
import { DialogService } from '../../../shared/dialogs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maintenance-room-level',
  templateUrl: './maintenance-room-level.component.html',
  styleUrls: ['./maintenance-room-level.component.css']
})
export class MaintenanceRoomLevelComponent implements OnInit {

  @Input() roomId;
  
  constructor(private dialogService: DialogService, private maintenanceRoomService: MaintenanceRoomService) { }

  displayedColumns = ['taskName', 'user', 'date', 'toggle'];
  dataSource: TableDataSource<Maintenance>;

  ngOnInit() {

      this.maintenanceRoomService.roomTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: Maintenance[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Maintenance>(clone, Maintenance);
      });

  }
  changeStatus(row: TableElement<Maintenance>, disabled:boolean, event) {
    event.preventDefault();
    if(!disabled)
    {
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          console.log(row);
          row.currentData.status = true;
          this.maintenanceRoomService.updateRowInformation(row.currentData).subscribe(maintenanceList => console.log("Success"));
        }
      });
    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }
}
