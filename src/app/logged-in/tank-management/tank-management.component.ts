import { Tank } from './../../shared/models/tank';
import { Observable } from 'rxjs';
import { DialogService } from '../../shared/dialogs.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';

@Component({
  selector: 'app-tank-management',
  templateUrl: './tank-management.component.html',
  styleUrls: ['./tank-management.component.css']
})
export class TankManagementComponent implements OnInit {
  dataSource: TableDataSource<Tank>;

  displayedColumns = ['id', 'projID', 'UID', 'status', 'speciesNames', 'actionColumn'];

  constructor(private dialogService: DialogService) { }

  @Input() tankList: Tank[] = [
    { id: 0, projID: 0, UID: 15, status: "Okay", speciesNames: "Bad Fish" },
    { id: 10, projID: 10, UID: 16, status: "Bad", speciesNames: "Alright Fish" },
    { id: 20, projID: 20, UID: 17, status: "Okay", speciesNames: "Small Fish" },
    { id: 22, projID: 22, UID: 19, status: "Great", speciesNames: "Big Fish" },
    { id: 29, projID: 29, UID: 20, status: "Pregnant", speciesNames: "Little Fish" },
  ];

  ngOnInit() {
    this.dataSource = new TableDataSource<Tank>(this.tankList, Tank);
  }

  confirmSave(row: TableElement<Tank>) {
    if (row.validator.valid) {
      console.log(row);
      if (row.id == -1) {
        row.currentData.id = this.tankList.length;

        // we are creating a new row
      } else {
        //we are editing a row
      }
      row.confirmEditCreate();
    }
  }


  cancelOrDelete(row: TableElement<Tank>) {
    if (!row.editing) {
      console.log(row);
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