import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tank } from '../models/tank'
import { Room } from '../models/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TankManagementService {

  //this will be removed. we will only store data for 1 room only. grab data from databse every time a new room is selected
  private tankList: BehaviorSubject<Tank[]> = new BehaviorSubject<Tank[]>(
    [
      { tankId: 101, projID: 201, UID: 301, roomId: 1, trialCode: 'Alpha', status: 'Pregnant', speciesNames: 'Cool Fish' },
      { tankId: 102, projID: 202, UID: 302, roomId: 1, trialCode: 'Bravo', status: 'Dead', speciesNames: 'Bad Fish' },
      { tankId: 103, projID: 203, UID: 303, roomId: 1, trialCode: 'Charlie', status: 'Crispy Fries', speciesNames: 'Dumb Fish' },
      { tankId: 104, projID: 204, UID: 304, roomId: 1, trialCode: 'Delta', status: 'Setup', speciesNames: 'Best Fish' },
    ]
  );

  private roomTanks: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(
    [
      { roomId: 1, building: "Humboldt", roomNumber: 215, tanks: [] },
      { roomId: 2, building: "Humboldt", roomNumber: 219, tanks: [] },
      { roomId: 3, building: "Humboldt", roomNumber: 220, tanks: [] },
      { roomId: 4, building: "Humboldt", roomNumber: 221, tanks: [] }
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

  // TODO: Implemeent add tank functionality
  // Pass a form inside of it, marker in HTML (with a hashtag #), take values from form an console.log to make sure it works
  createOrUpdateTank(unmodifiedTank : Tank, newTank: Tank) {
    let originalData = this.tankList.getValue();
    // TODO: Remove of() with HTTP request
    return of(newTank).pipe(
      map(tank => {
        // Add new tank
        if (unmodifiedTank == undefined) {
          // indexToUpdate will return -1 if the tank doesn't exist
          let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == newTank.tankId);
          if (indexToUpdate == -1) {
            originalData.push(tank);
          } else {
            // The tank already exists, based on the tankId
            console.log("This tank already exists!");
          }
        // Modify existing tank
        } else {
          let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == unmodifiedTank.tankId);
          originalData[indexToUpdate] = newTank;
        }
        this.tankList.next(originalData);
        return this.tankList.value;
      })
    );
  }

  deleteTank(unmodifiedTank : Tank, tankToDelete: Tank) {
    console.log("Deleting Tank");
    console.log(tankToDelete);
    let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == unmodifiedTank.tankId);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(tankToDelete);
  }

}
