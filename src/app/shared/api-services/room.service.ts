import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * This method will call the api to either add a new row or update existing. 
   * the api will respond back with the update/new object. 
   * if the data coming in doesnt have an id, then we know this will be a new object. 
   * @param data data to add to database
   */

  createOrUpdate(roomToCreateOrUpdate: Room) {
    console.log(roomToCreateOrUpdate)
    if (roomToCreateOrUpdate.roomId) {
      //this is an update. find the index by id and replace the item at the index with our updated one
      return this.updateRoom(roomToCreateOrUpdate);
    } else {
      //This is a create. In real api call, the roomResponse will already have the id. we assigning one for now
      return this.createRoom(roomToCreateOrUpdate);
    }
  }

  loadRooms(getLatest?: boolean): Observable<Room[]> {
    if (this.rooms.value.length == 0 || getLatest){
      this.http.get(environment.endpoints.ROOM).subscribe((allRooms: Room[]) => {
          this.rooms.next(allRooms)
      });
    }
    return this.rooms.asObservable();
  }

  createRoom(roomToCreate: Room): Observable<Room[]> {
    let originalData = this.rooms.getValue()
    return this.http.post(environment.endpoints.ROOM, roomToCreate).pipe(
      map((createdRoom: Room) => {
        console.log("created room" + createdRoom);
        originalData.push(createdRoom);
        this.rooms.next(originalData);
        return this.rooms.value;
      })
    )
  }

  updateRoom(roomToUpdate: Room): Observable<Room[]> {
    console.log(roomToUpdate);
    let indexToUpdate = this.rooms.value.findIndex(currentRoom => currentRoom.roomId == roomToUpdate.roomId);
    return this.http.put(environment.endpoints.ROOM + "/" + roomToUpdate.roomId, roomToUpdate).
      pipe(
        map((updatedRoom: Room) => {
          console.log("updated room" + updatedRoom);
          this.rooms.value[indexToUpdate] = updatedRoom;
          this.rooms.next(this.rooms.value);
          return this.rooms.value;
        })
      );
  }

  deleteRoom(roomToDelete: Room) {
    let indexToDelete = this.rooms.value.findIndex(currentRoom => currentRoom.roomId == roomToDelete.roomId);
    return this.http.delete(environment.endpoints.ROOM + "/" + roomToDelete.roomId).
      pipe(
        map((deletedRoom: Room) => {
          console.log("deleted room" + deletedRoom);
          this.rooms.value.splice(indexToDelete, 1)
          this.rooms.next(this.rooms.value)
        })
      );
  }


}
