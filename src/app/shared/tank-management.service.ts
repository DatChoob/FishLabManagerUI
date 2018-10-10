import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tank } from '../shared/models/tank'
import { Room } from './models/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TankManagementService {

  //this will be removed. we will only store data for 1 room only. grab data from databse every time a new room is selected
  private tankList: BehaviorSubject<Tank[]> = new BehaviorSubject<Tank[]>(
    [
      { tankId: 101, projID: 201, UID: 301, roomId: 1, status: 'Pregnant', speciesNames: 'Cool Fish' },
      { tankId: 102, projID: 202, UID: 302, roomId: 1, status: 'Dead', speciesNames: 'Bad Fish' },
      { tankId: 103, projID: 203, UID: 303, roomId: 1, status: 'Crispy Fries', speciesNames: 'Dumb Fish' },
      { tankId: 104, projID: 204, UID: 304, roomId: 1, status: 'Setup', speciesNames: 'Best Fish' },
    ]
  );

  private roomTanks: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(
    [
      {
        roomId: 1, building: "Humboldt", roomNumber: 215
      },
      {
        roomId: 2, building: "Humboldt", roomNumber: 219
      },
      {
        roomId: 3, building: "Humboldt", roomNumber: 220
      },
      {
        roomId: 4, building: "Humboldt", roomNumber: 221
      }
    ]
  );


  roomTanks$: Observable<Room[]> = this.roomTanks.asObservable();

  getTankList(): Observable<Room[]> {
    return this.roomTanks;
  }

  getTankListByRoomId(roomId: number): Observable<Tank[]> {
    //replace this with a http request
    return of(<Tank[]>this.tankList.value);
  }

  getTankByProperty(tankId) {
    let tankIndex = this.tankList.value.findIndex(tank => tank.tankId == tankId);
    return this.tankList.value[tankIndex];
  }

  // addTank(tankRow: Tank) {
  //   this.tankList.push(tankRow);
  // }

  // TODO: Implemenet add tank functionality
  // Pass a form inside of it, marker in HTML (with a hashtag #), take values from form an console.log to make sure it works
  createOrUpdateTank(tankToUpdate: Tank) {
    console.log("Updating tank : " + tankToUpdate);
    let originalData = this.tankList.getValue();
    // TODO: Remove of() with HTTP request
    return of(tankToUpdate).pipe(
      map(tank => {
        if (tankToUpdate.tankId == null) {
          tank.tankId = 21;
          originalData.push(tank);
        } else {
          let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == tankToUpdate.tankId);
          originalData[indexToUpdate] = tankToUpdate;
        }
        this.tankList.next(originalData);
        return this.tankList.value;
      })
    );
  }

  deleteTank(tankToDelete: Tank) {
    let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == tankToDelete.tankId);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(tankToDelete);
  }

}
