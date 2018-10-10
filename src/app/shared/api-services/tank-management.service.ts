import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tank } from '../models/tank'
import { Room } from '../models/room';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TankManagementService {

  constructor(private http: HttpClient) { }
  
  roomList: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  
  tankList: BehaviorSubject<Tank[]> = new BehaviorSubject<Tank[]>([]);
  
  roomTanks$: Observable<Room[]> = this.roomList.asObservable();

  getRoomList(): Observable<Room[]> {
    return this.http.get(environment.endpoints.ROOM).
      pipe(
        map((allRooms: Room[]) => {
          this.roomList.next(allRooms)
          return this.roomList.value;
        })
      );
  }

  getTankListByRoomId(roomId: number): Observable<Tank[]> {
    //replace this with a http request
    this.http.get<Tank[]>(`${environment.endpoints.TANK}/${roomId}`)
      .subscribe(roomTanksList => {
        this.tankList.next(roomTanksList)
      })
      return this.tankList.asObservable()
    //return of(<Tank[]>this.tankList.value);
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
    // return of(tankToUpdate).pipe(
    //   map(tank => {
    //     if (tankToUpdate.tankId == null) {
    //       tank.tankId = 21;
    //       originalData.push(tank);
    //     } else {
    //       let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == tankToUpdate.tankId);
    //       originalData[indexToUpdate] = tankToUpdate;
    //     }
    //     this.tankList.next(originalData);
    //     return this.tankList.value;
    //   })
    // );
  }

  deleteTank(tankToDelete: Tank) {
    let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == tankToDelete.tankId);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(tankToDelete);
  }

}
