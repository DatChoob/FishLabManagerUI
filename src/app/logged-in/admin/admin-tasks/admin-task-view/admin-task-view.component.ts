import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../admin-tasks.component';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../shared/dialogs.service';

@Component({
  selector: 'app-admin-task-view',
  templateUrl: './admin-task-view.component.html',
  styleUrls: ['./admin-task-view.component.css']
})
export class AdminTaskViewComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  displayedColumns = ['name', 'actionsColumn'];

  @Input() taskList: Task[];

  //type will be room or global
  @Input() type: string;

  dataSource: TableDataSource<Task>;
  ngOnInit() {
    this.dataSource = new TableDataSource<Task>(this.taskList, Task);
  }

  confirmSave(row: TableElement<Task>) {
    if (row.validator.valid) {
      console.log(row);
      if (row.id == -1) {

        // we are creating a new row
      } else {
        //we are editing a row
      }
      row.confirmEditCreate();
    }
  }

  cancelOrDelete(row: TableElement<Task>) {
    console.log(row);
    console.log(this.type);
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          console.log('The dialog was closed');
          row.cancelOrDelete();
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
