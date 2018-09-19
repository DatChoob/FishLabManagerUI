import { Component, OnInit } from '@angular/core';
import { TableDataSource } from 'angular4-material-table';
import { Maintenance } from '../../../shared/models/maintenance';
import { cloneDeep } from 'lodash';
import { MaintenanceGlobalService } from '../../../shared/api-services/maintenance-global.service';

@Component({
  selector: 'app-maintenance-global-level',
  templateUrl: './maintenance-global-level.component.html',
  styleUrls: ['./maintenance-global-level.component.css']
})
export class MaintenanceGlobalLevelComponent implements OnInit {

  constructor(private maintenanceGlobalService: MaintenanceGlobalService) { }

  displayedColumns = ['task', 'user', 'date', 'toggle'];
  dataSource: TableDataSource<Maintenance>;

  ngOnInit() {

      this.maintenanceGlobalService.globalTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: Maintenance[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Maintenance>(clone, Maintenance);
      });

  }

}
