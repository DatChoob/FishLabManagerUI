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
        return this.tankList.value;
      })
      return this.tankList.asObservable()
  }

//   loadSpecies(): Observable<Species[]> {
//     this.http.get<Species[]>(environment.endpoints.SPECIES)
//    .subscribe(allSpecies => {
//          this.species.next(allSpecies)
//          return this.species.value;
//    });
//    return this.species.asObservable();
//  }

  // getTankListByRoomId(roomId: number): Observable<Tank[]> {
  //   //replace this with a http request
  //   this.http.get<Tank[]>(`${environment.endpoints.TANK}/${roomId}`)
  //     .subscribe(roomTanksList => {
  //       this.tankList.next(roomTanksList)
  //     })
  //     return this.tankList.asObservable()
  //   //return of(<Tank[]>this.tankList.value);
  // }

  getTankByProperty(tankId) {
    let tankIndex = this.tankList.value.findIndex(tank => tank.tankId == tankId);
    return this.tankList.value[tankIndex];
  }

  createTank(newTank: Tank) {
    let originalData = this.tankList.getValue();
    // TODO: Remove of() with HTTP request
    return of(newTank).pipe(
      map(tank => {
        let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == newTank.tankId);
        if (indexToUpdate == -1) {
          originalData.push(tank);
        }
        this.tankList.next(originalData);
        return this.tankList.value;
      })
    );
  }

  modifyTank(unmodifiedTank: Tank, newTank: Tank) {
    let originalData = this.tankList.getValue();
    // TODO: Remove of() with HTTP request
    return of(newTank).pipe(
      map(tank => {
        let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == unmodifiedTank.tankId);
        originalData[indexToUpdate] = newTank;
        this.tankList.next(originalData);
        return this.tankList.value;
      })
    );
  }

  deleteTank(unmodifiedTank: Tank, tankToDelete: Tank) {
    let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == unmodifiedTank.tankId);
    this.tankList.value.splice(indexToDelete, 1);
    this.tankList.next(this.tankList.value);
    return of(tankToDelete);
  }

}
