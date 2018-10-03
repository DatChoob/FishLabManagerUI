import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Room } from '../models/room';
import { environment } from '../../../environments/environment';
import { RoomMaintenance } from '../models/roomMaintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRoomService {

  roomList: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  roomTasks: BehaviorSubject<RoomMaintenance[]> = new BehaviorSubject<RoomMaintenance[]>([]);

  constructor(private http: HttpClient) { }

  roomInfo$: Observable<Room[]> = this.roomList.asObservable();

  getRoomList(): Observable<Room[]> {
    return this.http.get(environment.endpoints.ROOM).
      pipe(
        map((allRooms: Room[]) => {
          this.roomList.next(allRooms)
          return this.roomList.value;
        })
      );
  }

  getRoomTasksByRoomId(roomId: number): Observable<RoomMaintenance[]> {
    //replace this with a http request
    this.http.get<RoomMaintenance[]>(`${environment.endpoints.ROOM_TASK}/${roomId}`)
      .subscribe(roomMaintenancesList => {
        this.roomTasks.next(roomMaintenancesList)
      })
      return this.roomTasks.asObservable()
  }
  

  updateRowInformation(roomMaintenance: RoomMaintenance): Observable<RoomMaintenance[]>{
    //put is expecting the object that will go to API
    
    return this.http.put<RoomMaintenance>(`${environment.endpoints.ROOM_TASK}/${roomMaintenance.roomTaskCompletedId}`, roomMaintenance).pipe(
      map(maintenanceFromApi => {
        //maintenanceFromApi is the object that is return after the api has changed it  
        let indexToUpdate = this.roomTasks.value.findIndex(roomMaintenanceTask => roomMaintenanceTask.roomTaskCompletedId == roomMaintenance.roomTaskCompletedId);
        this.roomTasks.value[indexToUpdate] = maintenanceFromApi;
        this.roomTasks.next(this.roomTasks.value);
        return this.roomTasks.value;
       })
    );
    
    
  }

}