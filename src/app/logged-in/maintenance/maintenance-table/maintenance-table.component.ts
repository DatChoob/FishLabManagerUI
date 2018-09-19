import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { TableDataSource } from 'angular4-material-table';
import { cloneDeep } from 'lodash';
import { TaskService } from '../../../shared/api-services/task.service';

@Component({
  selector: 'app-maintenance-table',
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css']
})
export class MaintenanceTableComponent implements OnInit {

  @Input() useGlobalTasks: boolean = false;

  constructor(private taskService: TaskService) { }

  displayedColumns = ['task', 'user', 'date', 'toggle'];
  dataSource: TableDataSource<Task>;

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

}
