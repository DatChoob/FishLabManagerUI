import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../shared/dialogs.service';
import { TaskService } from '../../../../shared/api-services/task.service';
import { Task } from '../../../../shared/models/task';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.css']
})
export class AdminTaskViewComponent implements OnInit {

  //type will be room or global
  @Input() useGlobalTasks: boolean = false;

  displayedColumns = ['name', 'actionsColumn'];
  dataSource: TableDataSource<Task>;

  constructor(private dialogService: DialogService, private taskService: TaskService) { }

  ngOnInit() {

    if(this.useGlobalTasks){
      this.taskService.globalTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service
        let clone: Task[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Task>(clone, Task);
      });
    }else{
      this.taskService.roomTasks.subscribe(data => {
        //we do a deep clone so that any edits in the table don't reflect in our roomtasks in the service
        let clone: Task[] = cloneDeep(data);
        this.dataSource = new TableDataSource<Task>(clone, Task);
      });
    }
   
  }

  confirmSave(row: TableElement<Task>) {
    if (row.validator.valid &&  !!row.currentData.name && !!row.currentData.name.trim()) {
      this.taskService.createOrUpdate(row.currentData, this.useGlobalTasks)
        .subscribe(
          allTasks => {
            row.confirmEditCreate();
          }, err => console.log(err));
    }
  }

  cancelOrDelete(row: TableElement<Task>) {
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.taskService.deleteTask(row.currentData, this.useGlobalTasks).subscribe(resonse => { });
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
