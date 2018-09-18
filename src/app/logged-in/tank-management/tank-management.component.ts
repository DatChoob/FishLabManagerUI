import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TankManagementDataSource } from './tank-management-datasource';
import { Tank } from '../../shared/models/tank';

@Component({
  selector: 'app-tank-management',
  templateUrl: './tank-management.component.html',
  styleUrls: ['./tank-management.component.css']
})

export class TankManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TankManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'projID', 'UID', 'status', 'speciesNames'];
  selectedRowIndex = 1;
  selectedRow: Tank;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute) {
    }

  ngOnInit() {
    this.dataSource = new TankManagementDataSource(this.paginator, this.sort);
  }

  highlightSelectedRow(row) {
    this.selectedRowIndex = row.id;
    this.selectedRow = row;
    console.log(this.selectedRow);  // TODO: Delete me
  }

  getRowProperty(propertyName) {
    console.log("Testing");
    console.log("The value of " + propertyName + " is : " + this.selectedRow[propertyName]);
  }

  addRow() {
    this.router.navigate(['details/'], {relativeTo:this.route});
  }

  modifyRow() {
    this.router.navigate(['details/' + this.selectedRowIndex], {relativeTo:this.route});
  }

  deleteRow() {
    // TODO
  }

}
