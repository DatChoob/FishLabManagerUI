import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintenanceTableService } from '../../../shared/maintenance-table.service';
import { MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {Maintenance } from '../../../shared/models/maintenance';
import { MaintenanceComponent } from '../maintenance.component';
import { TableElement, TableDataSource } from 'angular4-material-table';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';

@Component({
  selector: 'app-maintenance-table',
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css']
})
export class MaintenanceTableComponent implements OnInit {

  constructor(private _maintenanceService: MaintenanceTableService) { }
  
  displayedColumns: string[] = ['task', 'name', 'date', 'status'];
  dataSource = this._maintenanceService.getMaintenanceTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  // openDialog(): Observable<boolean>{
  //   return this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?')
    
  // }

}
