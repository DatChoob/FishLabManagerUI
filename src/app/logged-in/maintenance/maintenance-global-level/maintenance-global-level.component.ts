import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';
import { GlobalMaintenance } from '../../../shared/models/globalMaintenance';
import { MaintenanceGlobalService } from '../../../shared/api-services/maintenance-global.service';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/shared/auth.service';

import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-maintenance-global-level',
  templateUrl: './maintenance-global-level.component.html',
  styleUrls: ['./maintenance-global-level.component.css']
})
export class MaintenanceGlobalLevelComponent implements OnInit {

  constructor(private dialogService: DialogService, private maintenanceGlobalService: MaintenanceGlobalService, public authService:AuthService, private snackBar: MatSnackBar,) { }

  displayedColumns = ['taskName', 'user', 'date', 'toggle'];
  dataSource: MatTableDataSource<GlobalMaintenance>;

  ngOnInit() {

    this.maintenanceGlobalService.getGlobalMaintenanceTasks().subscribe(a=>{
      this.maintenanceGlobalService.globalTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: GlobalMaintenance[] = cloneDeep(data);
        this.dataSource = new MatTableDataSource<GlobalMaintenance>(clone);
      });

    })

    
  }
  changeStatus(row: GlobalMaintenance, disabled: boolean, event) {
    event.preventDefault();
    if(!disabled)
    {
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          row.status = 'Completed'
          this.snackBar.open(" Task Saved", "", { duration: 1000 });
          this.maintenanceGlobalService.updateRowInformation(row).subscribe(maintenanceList => {
          }
            );
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
