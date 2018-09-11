import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { ActivatedRoute } from '@angular/router';

export interface Food {
  value: string;
  status: string;

}

@Component({
  selector: 'app-admin-account-detail',
  templateUrl: './admin-account-detail.component.html',
  styleUrls: ['./admin-account-detail.component.css']
})
export class AdminAccountDetailComponent implements OnInit {

  id : string;
  constructor(private readonly route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  displayedColumns = ['projectName', 'status', 'actionsColumn'];

  @Input() taskList:Person[] = [
    { index: 0, projectName: 'Mark', status: 15 },
    { index: 1, projectName: 'Brad', status: 50 },
  ];

  foods: Food[] = [
    {value: 'steak', status: 'OK'},
    {value: 'pizza', status: 'OK'},
    {value: 'tacos', status: 'No'}
  ];

  dataSource: TableDataSource<Person>;
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.taskList, Person);

    this.dataSource.datasourceSubject.subscribe(taskList => {
      console.log(taskList);

    });
  }

  confirmSave(row: TableElement<any>) {
    console.log(this.taskList);
    console.log(row);
    if (row.id == -1) {
      row.currentData.index=this.taskList.length;
      
      // we are creating a new row
    } else {
      //we are editing a row
    }
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<any>) {
    console.log(row);
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
    }
    row.cancelOrDelete();
  }
  
}

class Person {
  index:number;
  projectName: string;
  status: number;
}


