import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  roomTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    [
      { id: 1, name: "Clean the tanks" },
      { id: 2, name: "Add water" }
    ]
  );

  globalTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    [
      { id: 1, name: "Clean the floors" }
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
  createOrUpdate(taskToCreateOrUpdate: Task, isGlobalTask: boolean): Observable<Task[]> {
    return isGlobalTask? this.createOrUpdateGlobalTask(taskToCreateOrUpdate): this.createOrUpdateRoomTask(taskToCreateOrUpdate);
  }

  private createOrUpdateRoomTask(taskToCreateOrUpdate: Task) {
    let originalData = this.roomTasks.getValue();
    //TODO: remove of() with http request
    return of(taskToCreateOrUpdate).pipe(
      map(task => {
        if (taskToCreateOrUpdate.id == null) {
          //This is a create. In real api call, the task will already have the id. we assigning one for now
          task.id = 21;
          originalData.push(task);
        } else {
          //this is an update. find the index by id and replace the item at the index with our updated one
          let indexToUpdate = this.roomTasks.value.findIndex(roomTask => roomTask.id == taskToCreateOrUpdate.id);
          originalData[indexToUpdate] = taskToCreateOrUpdate;
        }

        this.roomTasks.next(originalData);
        return this.roomTasks.value;
      })
    );
  }

  private createOrUpdateGlobalTask(taskToCreateOrUpdate: Task) {
    let originalData = this.roomTasks.getValue();
    //TODO: remove of() with http request
    return of(taskToCreateOrUpdate).pipe(
      map(task => {
        if (taskToCreateOrUpdate.id == null) {
          //This is a create. In real api call, the task will already have the id. we assigning one for now
          task.id = 21;
          originalData.push(task);
        } else {
          //this is an update. find the index by id and replace the item at the index with our updated one
          let indexToUpdate = this.roomTasks.value.findIndex(roomTask => roomTask.id == taskToCreateOrUpdate.id);
          originalData[indexToUpdate] = taskToCreateOrUpdate;
        }

        this.roomTasks.next(originalData);
        return this.roomTasks.value;
      })
    );
  }

  deleteTask(taskToDelete: Task, isGlobalTask: boolean) {
    return isGlobalTask? this.deleteRoomTask(taskToDelete): this.deleteGlobalTask(taskToDelete);

  }

  private deleteRoomTask(taskToDelete) {
    //TODO replace this with a real http request to delete by id.
    let indexToDelete = this.roomTasks.value.findIndex(roomTask => roomTask.id == taskToDelete.id);
    this.roomTasks.value.splice(indexToDelete, 1);
    this.roomTasks.next(this.roomTasks.value);
    return of(true);
  }

  private deleteGlobalTask(taskToDelete) {
    //TODO replace this with a real http request to delete by id.
    let indexToDelete = this.globalTasks.value.findIndex(roomTask => roomTask.id == taskToDelete.id);
    this.globalTasks.value.splice(indexToDelete, 1);
    this.globalTasks.next(this.globalTasks.value);
    return of(true);
  }



}
