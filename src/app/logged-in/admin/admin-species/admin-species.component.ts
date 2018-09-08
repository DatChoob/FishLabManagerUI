import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Species } from '../../../shared/models/species';

@Component({
  selector: 'app-admin-species',
  templateUrl: './admin-species.component.html',
  styleUrls: ['./admin-species.component.css']
})
export class AdminSpeciesComponent implements OnInit {

  constructor() { }
  displayedColumns = ['originalName', 'currentName', 'commonName', 'actionsColumn'];

  @Input() speciesList: Species[] = [
    { id: 0, originalName: 'Mark', commonName: 'MarkC', currentName: 'Marc' },
    { id: 1, originalName: 'Brad', commonName: 'BradC', currentName: 'Bard' },
  ];

  dataSource: TableDataSource<Species>;
  ngOnInit() {
    this.dataSource = new TableDataSource<Species>(this.speciesList, Species);

    this.dataSource.datasourceSubject.subscribe(taskList => {
      console.log(taskList);

    });

  }


  confirmSave(row: TableElement<any>) {
    console.log(this.speciesList);
    console.log(row);
    if (row.id == -1) {
      row.currentData.index=this.speciesList.length;
      
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
