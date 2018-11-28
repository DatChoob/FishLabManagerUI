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
    this.http.get<Tank[]>(`${environment.endpoints.TANK}/room/${roomId}`)
      .subscribe(roomTanksList => {
        this.tankList.next(roomTanksList)
        return this.tankList.value;
      })
    return this.tankList.asObservable()
  }

  getTankById(tankId) {
    let tankIndex = this.tankList.value.findIndex(tank => tank.tankId == tankId);
    return this.tankList.value[tankIndex];
  }

  createTank(newTank: Tank): Observable<Tank[]> {
    let originalData = this.tankList.getValue();
    return this.http.post<Tank>(`${environment.endpoints.TANK}/${newTank.roomId}`, newTank).pipe(
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

  modifyTank(unmodifiedTank: Tank, newTank: Tank): Observable<Tank[]> {
    let originalData = this.tankList.getValue();
    return this.http.put<Tank>(`${environment.endpoints.TANK}/${unmodifiedTank.tankId}`, newTank).pipe(
      map(tank => {
        let indexToUpdate = this.tankList.value.findIndex(tank => tank.tankId == unmodifiedTank.tankId);
        originalData[indexToUpdate] = tank;
        this.tankList.next(originalData);
        return this.tankList.value;
      })
    );
  }

  deleteTank(unmodifiedTank: Tank, tankToDelete: Tank): Observable<Tank[]> {
    return this.http.delete<Tank>(`${environment.endpoints.TANK}/${unmodifiedTank.tankId}`).pipe(
      map((deletedTank: Tank) => {
        let indexToDelete = this.tankList.value.findIndex(tank => tank.tankId == deletedTank.tankId);
        this.tankList.value.splice(indexToDelete, 1);
        this.tankList.next(this.tankList.value);
        return this.tankList.value;
      })
    )

  }

}
