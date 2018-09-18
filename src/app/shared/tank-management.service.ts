import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Tank } from './models/tank';

@Injectable({
  providedIn: 'root'
})
export class TankManagementService {

  dataSource = new MatTableDataSource<Tank>(ELEMENT_DATA);

  constructor() { }

  getTankManagementDataSource() {
    return this.dataSource;  
  }
}


const ELEMENT_DATA: Tank[] = [
    {id: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish'},
    {id: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish'},
    {id: 3, projID: 4, UID: 666, status: 'Dumb', speciesNames: 'Dumb Fish'},
  ];