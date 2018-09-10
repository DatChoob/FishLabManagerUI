import { Room } from './../models/room';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  room: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(
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
   * @param isGlobalTask is this data for a global task?
   */
  createOrUpdate(roomToCreateOrUpdate: Room, isGlobalTask: boolean): Observable<Room[]> {
    return this.createOrUpdateRoom(roomToCreateOrUpdate);
  }

  private createOrUpdateRoom(roomToCreateOrUpdate: Room) {
    let originalData = this.room.getValue();
    //TODO: remove of() with http request
    return of(roomToCreateOrUpdate).pipe(
      map(task => {
        if (roomToCreateOrUpdate.id == null) {
          //This is a create. In real api call, the task will already have the id. we assigning one for now
          task.id = 21;
          originalData.push(task);
        } else {
          //this is an update. find the index by id and replace the item at the index with our updated one
          let indexToUpdate = this.room.value.findIndex(roomTask => roomTask.id == roomToCreateOrUpdate.id);
          originalData[indexToUpdate] = roomToCreateOrUpdate;
        }

        this.room.next(originalData);
        return this.room.value;
      })
    );
  }


  deleteTask(roomToDelete: Room) {
    return this.deleteRoom(roomToDelete);

  }

  private deleteRoom(roomToDelete) {
    //TODO replace this with a real http request to delete by id.
    let indexToDelete = this.room.value.findIndex(roomTask => roomTask.id == roomToDelete.id);
    this.room.value.splice(indexToDelete, 1);
    this.room.next(this.room.value);
    return of(true);
  }




}
