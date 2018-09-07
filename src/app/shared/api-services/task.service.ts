import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  _roomTasks: Task[] = [
    { id: 1, name: "Clean the tanks" },
    { id: 2, name: "Add water" }
  ];

  _globalTasks: Task[] = [
    { id: 1, name: "Clean the floors" }
  ];

  roomTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this._roomTasks);
  globalTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this._roomTasks);

  getRoomTasks(): Observable<Task[]> {
    return this.roomTasks.asObservable();
  }
  /**
   * This method will call the api to either add a new row or update existing. 
   * the api will respond back with the update/new object. 
   * if the data coming in doesnt have an id, then we know this will be a new object. 
   * @param data data to add to database
   * @param isGlobalTask is this data for a global task?
   */
  createOrUpdate(taskToCreateOrUpdate: Task, isGlobalTask: boolean): Observable<Task[]> {
    //use real url that will be in environment variables
    let url = isGlobalTask ? "/api/task/global" : "/api/task/room";
    return of(taskToCreateOrUpdate).pipe(
      map(task => {
        if (taskToCreateOrUpdate.id == null) {
          //In real api call, the task will already have the id
          task.id = 21;
          this._roomTasks.push(task);
        } else {
          //this is an update. find the index by id and replace the item at the index with our new one
          let indexToChange = this._roomTasks.findIndex(roomTask => roomTask.id == task.id);
          this._roomTasks[indexToChange] = task;
        }
        this.roomTasks.next(this._roomTasks);
        return this.roomTasks.value;
      }))
  }

  deleteTask(taskToDelete: Task, isGlobalTask: boolean) {
    //TODO replace this with a real http request to delete by id.
    return of(true);

  }


  constructor(private http: HttpClient) { }
}
