import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tank } from '../shared/models/tank'
import { Room } from './models/room';

@Injectable({
  providedIn: 'root'
})

export class TankManagementService {


  private tankList: BehaviorSubject<Tank[]> = new BehaviorSubject<Tank[]>(
    [
      { tankId: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 3, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 4, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
      { tankId: 5, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 6, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 7, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 8, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
      { tankId: 9, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 10, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 11, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 12, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
      { tankId: 13, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
      { tankId: 14, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 15, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 16, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 17, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
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

  //this will be removed. we will only store data for 1 room only. grab data from databse every time a new room is selected
  tasksByRoomId = {
    '1': [
      { tankId: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 3, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 4, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
    ],
    '2': [
      { tankId: 5, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 6, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 7, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 8, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
    ],
    '3': [
      { tankId: 9, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 10, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 11, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 12, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
    ],
    '4': [
      { tankId: 13, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
      { tankId: 14, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
      { tankId: 15, projID: 4, UID: 777, status: 'Dumb', speciesNames: 'Dumb Fish' },
      { tankId: 16, projID: 22, UID: 31, status: 'Perfect', speciesNames: 'Best Fish' },
    ]
  };

  roomTanks$: Observable<Room[]> = this.roomTanks.asObservable();

  getTankList(): Observable<Room[]> {
    return this.roomTanks;
  }

  getTankListByRoomId(roomId: number): Observable<Tank[]> {
    //replace this with a http request
    return of(<Tank[]>this.tasksByRoomId["" + roomId]);
  }

  getTankByProperty(tankId) {
    let tankIndex = this.tankList.value.findIndex(tank => tank.tankId == tankId);
    return this.tankList.value[tankIndex];
  }

  // addTank(tankRow: Tank) {
  //   this.tankList.push(tankRow);
  // }

  deleteTank(row: Tank) {
    console.log("Deleting row : " + row);
    let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == row.tankId);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(true);
  }

}
