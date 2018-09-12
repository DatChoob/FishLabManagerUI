import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class tankResponseService {

  rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(
    [
      { id: 1, building: 'Humboldt', roomNumber: 121},
      { id: 2, building: 'Humboldt', roomNumber: 123}
    ]
  );

  constructor(private http: HttpClient) { }

  /**
   * This method will call the api to either add a new row or update existing. 
   * the api will respond back with the update/new object. 
   * if the data coming in doesnt have an id, then we know this will be a new object. 
   * @param data data to add to database
   * @param isGlobaltankResponse is this data for a global tankResponse?
   */
  createOrUpdate(roomToCreateOrUpdate: Room, isGlobaltankResponse: boolean): Observable<Room[]> {
    let originalData = this.rooms.getValue();
    //TODO: remove of() with http request
    return of(roomToCreateOrUpdate).pipe(
      map(tankResponse => {
        if (roomToCreateOrUpdate.id == null) {
          //This is a create. In real api call, the tankResponse will already have the id. we assigning one for now
          tankResponse.id = 21;
          originalData.push(tankResponse);
        } else {
          //this is an update. find the index by id and replace the item at the index with our updated one
          let indexToUpdate = this.rooms.value.findIndex(roomtankResponse => roomtankResponse.id == roomToCreateOrUpdate.id);
          originalData[indexToUpdate] = roomToCreateOrUpdate;
        }

        this.rooms.next(originalData);
        return this.rooms.value;
      })
    );
  }

  deletetankResponse(roomToDelete: Room) {
      //TODO replace this with a real http request to delete by id.
      let indexToDelete = this.rooms.value.findIndex(roomtankResponse => roomtankResponse.id == roomToDelete.id);
      this.rooms.value.splice(indexToDelete, 1);
      this.rooms.next(this.rooms.value);
      return of(true);

  }
}
