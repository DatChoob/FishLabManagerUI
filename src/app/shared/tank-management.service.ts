import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tank } from '../shared/models/tank'

@Injectable({
  providedIn: 'root'
})

export class TankManagementService {
  tankList: BehaviorSubject<Tank[]> = new BehaviorSubject<Tank[]>( 
    [
      {id: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish'},
      {id: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish'},
      {id: 3, projID: 4, UID: 666, status: 'Dumb', speciesNames: 'Dumb Fish'},
      {id: 9, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish'},
    ]
  );

  getTankList(): Observable<Tank[]> {
    return this.tankList.asObservable();
  }

  getTankByProperty(tankID) {
    let tankIndex = this.tankList.value.findIndex(tank => tank.id == tankID);
    return this.tankList.value[tankIndex];
  }

  // addTank(tankRow: Tank) {
  //   this.tankList.push(tankRow);
  // }

  deleteTank(row: Tank) {
    console.log("Deleting row : " + row);
    let indexToDelete = this.tankList.value.findIndex(tank => tank.id == row.id);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(true);
  }

  private delete
}
