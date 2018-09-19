import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Maintenance } from './models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceTableService {

  dataSource = new MatTableDataSource<Maintenance>(ELEMENT_DATA);

  constructor() { }

  getMaintenanceTableDataSource() {
    return this.dataSource;  
  }
}


const ELEMENT_DATA: Maintenance[] = [
  {taskId: 1, name: 'First Student', date: '12/1/2018', status:false},
  {taskId: 2, name: 'Second Student', date: '12/4/2018', status:false}
];
