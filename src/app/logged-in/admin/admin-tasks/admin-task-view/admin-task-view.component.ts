import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../shared/dialogs.service';
import { MaintenanceTaskDefinitionService } from '../../../../shared/api-services/maintenance-task-definition.service';
import { MaintenanceTaskDefinition } from '../../../../shared/models/mantenance-task-definition';
import { cloneDeep } from 'lodash';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.css']
})
export class AdminTaskViewComponent implements OnInit {

  //type will be room or global
  @Input() useGlobalTasks: boolean = false;

  displayedColumns = ['name', 'actionsColumn'];
  dataSource: TableDataSource<MaintenanceTaskDefinition>;

  constructor(private dialogService: DialogService, private maintenanceTaskDefinitionService: MaintenanceTaskDefinitionService) { }

  ngOnInit() {

    if (this.useGlobalTasks) {
      this.maintenanceTaskDefinitionService.loadGlobalMaintainenceTasks().pipe(
        tap(t => {
          this.maintenanceTaskDefinitionService.globalTasks.subscribe(data => {
            //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
            this.dataSource = new TableDataSource<MaintenanceTaskDefinition>(cloneDeep(data), MaintenanceTaskDefinition);
          });
        })
      ).subscribe();

    } else {
      this.maintenanceTaskDefinitionService.loadRoomMaintainenceTasks().pipe(
        tap(t => {
          this.maintenanceTaskDefinitionService.roomTasks.subscribe(data => {
            //we do a deep clone so that any edits in the table don't reflect in our roomtasks in the service
            this.dataSource = new TableDataSource<MaintenanceTaskDefinition>(cloneDeep(data), MaintenanceTaskDefinition);
          });
        })
      ).subscribe();
    }

  }

  confirmSave(row: TableElement<MaintenanceTaskDefinition>) {
    if (row.validator.valid && !!row.currentData.description && !!row.currentData.description.trim()) {
      this.maintenanceTaskDefinitionService.createOrUpdate(row.currentData, this.useGlobalTasks)
        .subscribe(
          allTasks => {
            row.confirmEditCreate();
          }, err => console.log(err));
    }
  }

  cancelOrDelete(row: TableElement<MaintenanceTaskDefinition>) {
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.maintenanceTaskDefinitionService.deleteTask(row.currentData, this.useGlobalTasks).subscribe(resonse => { });
        }
      });
    } else {
      //cancels edit and restores to original text
      row.cancelOrDelete();

    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
