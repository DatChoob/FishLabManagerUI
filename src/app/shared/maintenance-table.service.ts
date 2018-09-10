import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceTableService {

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  getMaintenanceTableDataSource() {
    return this.dataSource;  
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', weight: 0},
  {position: 2, name: '', weight: 0}
];
