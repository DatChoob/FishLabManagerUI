import { Component, OnInit } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Maintenance } from '../../../shared/models/maintenance';
import { cloneDeep } from 'lodash';
import { MaintenanceGlobalService } from '../../../shared/api-services/maintenance-global.service';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';

@Component({
  selector: 'app-maintenance-global-level',
  templateUrl: './maintenance-global-level.component.html',
  styleUrls: ['./maintenance-global-level.component.css']
})
export class MaintenanceGlobalLevelComponent implements OnInit {

  constructor(private dialogService: DialogService, private maintenanceGlobalService: MaintenanceGlobalService) { }

  displayedColumns = ['task', 'user', 'date', 'toggle'];
  dataSource: TableDataSource<Maintenance>;

  ngOnInit() {

      this.maintenanceGlobalService.globalTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: Maintenance[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Maintenance>(clone, Maintenance);
      });

    
  }
  changeStatus(row: TableElement<Maintenance>, disabled: boolean, event) {
    event.preventDefault();
    if(!disabled)
    {
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          console.log(row);
          row.currentData.status = true;
          this.maintenanceGlobalService.updateRowInformation(row.currentData).subscribe(maintenanceList => console.log("Success"));
        }
      });
    }
    
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }
}
