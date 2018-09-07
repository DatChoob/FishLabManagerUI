import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintenanceTableService } from '../../../shared/maintenance-table.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-maintenance-table',
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css']
})
export class MaintenanceTableComponent implements OnInit {

  constructor(private _maintenanceService: MaintenanceTableService) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this._maintenanceService.getMaintenanceTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
