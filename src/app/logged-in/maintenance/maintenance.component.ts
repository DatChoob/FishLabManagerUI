import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MaintenanceTableService } from '../../shared/maintenance-table.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

   rooms = ["119", '121', '123'];

  constructor(private _maintenanceService: MaintenanceTableService) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this._maintenanceService.getMaintenanceTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  onLinkClick(event: MatTabChangeEvent){
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  }
}