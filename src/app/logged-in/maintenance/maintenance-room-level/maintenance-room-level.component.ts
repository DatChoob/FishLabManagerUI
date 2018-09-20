import { Component, OnInit } from '@angular/core';
import { TableDataSource } from 'angular4-material-table';
import { cloneDeep } from 'lodash';
import { MaintenanceRoomService } from '../../../shared/api-services/maintenance-room.service';
import { Maintenance } from '../../../shared/models/maintenance';

@Component({
  selector: 'app-maintenance-room-level',
  templateUrl: './maintenance-room-level.component.html',
  styleUrls: ['./maintenance-room-level.component.css']
})
export class MaintenanceRoomLevelComponent implements OnInit {

  constructor(private maintenanceRoomService: MaintenanceRoomService) { }

  displayedColumns = ['task', 'user', 'date', 'toggle'];
  dataSource: TableDataSource<Maintenance>;

  ngOnInit() {

      this.maintenanceRoomService.roomTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: Maintenance[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Maintenance>(clone, Maintenance);
      });

  }
  changeStatus(row){
    row.currentData.status = !row.currentData.status;
    console.log(row);
    row.currentData.name = "hi";
    
    row.currentData.date = "dog";
    console.log(row);
  }
}
