import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../shared/dialogs.service';
import { TaskService } from '../../../../shared/api-services/task.service';
import { Task } from '../../../../shared/models/task';

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
    this.taskService.getRoomTasks().subscribe(data => {
      this.dataSource = new TableDataSource<Task>(data, Task);
    });
  }

  confirmSave(row: TableElement<Task>) {
    if (row.validator.valid) {
      this.taskService.createOrUpdate(row.currentData, this.useGlobalTasks)
        .subscribe(
          allTasks => {
            //we must reinitialize the table since we updated data
            this.dataSource = new TableDataSource<Task>(allTasks, Task)
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
          console.log('The dialog was closed');
          this.taskService.deleteTask(row.currentData, this.useGlobalTasks).subscribe(resonse => {
            //the internal table will delete the row for us, so we don't need to reinitialize the datasource
            row.cancelOrDelete();

          })
        }
      });
    } else {
      row.cancelOrDelete();

    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
