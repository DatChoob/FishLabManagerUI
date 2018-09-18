import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';

@Component({
  selector: 'app-tank-management-detail',
  templateUrl: './tank-management-detail.component.html',
  styleUrls: ['./tank-management-detail.component.css']
})
export class TankManagementDetailComponent implements OnInit {

  id : string;
  constructor(private readonly route: ActivatedRoute) {
  }
  
  displayedColumns = ['id', 'projID', 'UID', 'status', 'speciesNames', 'actionsColumn'];

  @Input() tankList:Tank[] = [
    {id: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish'},
    {id: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish'},
    {id: 3, projID: 4, UID: 666, status: 'Dumb', speciesNames: 'Dumb Fish'},
  ];

  dataSource: TableDataSource<Tank>;
  ngOnInit() {

     this.route.paramMap.subscribe(params=> {
       this.id=params.get("id"); 
       console.log(this.id);}

    )

    this.dataSource = new TableDataSource<any>(this.tankList, Tank);

    this.dataSource.datasourceSubject.subscribe(tankList => {
      console.log(tankList);

    });
  }

  confirmSave(row: TableElement<any>) {
    console.log(this.tankList);
    console.log(row);
    if (row.id == -1) {
      row.currentData.index=this.tankList.length;
      
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
