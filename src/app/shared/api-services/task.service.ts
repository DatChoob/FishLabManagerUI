import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  roomTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  globalTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) { }



  loadGlobalMaintainenceTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.endpoints.GLOBAL_MAINTENANCE_DEFINITION).pipe(
      tap(globalMaintainenceTasksDefinitions => {
        this.globalTasks.next(globalMaintainenceTasksDefinitions)
      })
    )
  }

  loadRoomMaintainenceTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.endpoints.ROOM_MAINTENANCE_DEFINITION).pipe(
      tap(roomMaintainenceTasksDefinitions => {
        this.roomTasks.next(roomMaintainenceTasksDefinitions)
      })
    )
  }

  /**
   * This method will call the api to either add a new row or update existing. 
   * the api will respond back with the update/new object. 
   * if the data coming in doesnt have an id, then we know this will be a new object. 
   * @param data data to add to database
   * @param isGlobalTask is this data for a global task?
   */
  createOrUpdate(taskToCreateOrUpdate: Task, isGlobalTask: boolean): Observable<Task[]> {
    return isGlobalTask ? this.createOrUpdateGlobalTask(taskToCreateOrUpdate) : this.createOrUpdateRoomTask(taskToCreateOrUpdate);
  }

  private createOrUpdateRoomTask(taskToCreateOrUpdate: Task) {
    if (taskToCreateOrUpdate.taskId == null)
      return this.createRoomMaintainenceTask(taskToCreateOrUpdate);
    else
      return this.updateRoomMaintainenceTask(taskToCreateOrUpdate);


  }

  createRoomMaintainenceTask(taskToCreate: Task) {
    let originalData = this.roomTasks.getValue();
    //TODO: remove of() with http request
    return this.http.post<Task>(environment.endpoints.ROOM_MAINTENANCE_DEFINITION, taskToCreate).pipe(
      map(createdTask => {
        originalData.push(createdTask);
        this.roomTasks.next(originalData);
        return this.roomTasks.value;
      })
    );

  }

  updateRoomMaintainenceTask(taskToUpdate: Task) {

    let originalData = this.roomTasks.getValue();
    //TODO: remove of() with http request
    return this.http.put<Task>(environment.endpoints.ROOM_MAINTENANCE_DEFINITION + "/" + taskToUpdate.taskId, taskToUpdate).pipe(
      map(updatedTask => {
        //this is an update. find the index by id and replace the item at the index with our updated one
        let indexToUpdate = this.roomTasks.value.findIndex(roomTask => roomTask.taskId == taskToUpdate.taskId);
        originalData[indexToUpdate] = updatedTask;

        this.roomTasks.next(originalData);
        return this.roomTasks.value;
      })
    );

  }

  private createOrUpdateGlobalTask(taskToCreateOrUpdate: Task) {
    if (taskToCreateOrUpdate.taskId == null)
      return this.createGlobalMaintainenceTask(taskToCreateOrUpdate);
    else
      return this.updateGlobalMaintainenceTask(taskToCreateOrUpdate);

  }

  createGlobalMaintainenceTask(taskToCreate: Task) {
    let originalData = this.globalTasks.getValue();
    //TODO: remove of() with http request
    return this.http.post<Task>(environment.endpoints.GLOBAL_MAINTENANCE_DEFINITION, taskToCreate).pipe(
      map(createdTask => {
        originalData.push(createdTask);
        this.globalTasks.next(originalData);
        return this.globalTasks.value;
      })
    );

  }

  updateGlobalMaintainenceTask(taskToUpdate: Task) {

    let originalData = this.globalTasks.getValue();
    //TODO: remove of() with http request
    return this.http.put<Task>(environment.endpoints.GLOBAL_MAINTENANCE_DEFINITION, taskToUpdate).pipe(
      map(updatedTask => {
        //this is an update. find the index by id and replace the item at the index with our updated one
        let indexToUpdate = this.globalTasks.value.findIndex(globalTask => globalTask.taskId == taskToUpdate.taskId);
        originalData[indexToUpdate] = updatedTask;

        this.globalTasks.next(originalData);
        return this.globalTasks.value;
      })
    );

  }

  deleteTask(taskToDelete: Task, isGlobalTask: boolean) {
    return isGlobalTask ? this.deleteGlobalTask(taskToDelete) : this.deleteRoomTask(taskToDelete);

  }

  private deleteRoomTask(taskToDelete: Task) {
    return this.http.delete<Task>(environment.endpoints.ROOM_MAINTENANCE_DEFINITION + "/" + taskToDelete.taskId).pipe(
      map(deletedTask => {
        let indexToDelete = this.roomTasks.value.findIndex(roomTask => roomTask.taskId == deletedTask.taskId);
        this.roomTasks.value.splice(indexToDelete, 1);
        this.roomTasks.next(this.roomTasks.value);
        return this.roomTasks.value;
      })
    );
  }

  private deleteGlobalTask(taskToDelete: Task) {
    return this.http.delete<Task>(environment.endpoints.GLOBAL_MAINTENANCE_DEFINITION + "/" + taskToDelete.taskId).pipe(
      map(deletedTask => {
        let indexToDelete = this.globalTasks.value.findIndex(roomTask => roomTask.taskId == deletedTask.taskId);
        this.globalTasks.value.splice(indexToDelete, 1);
        this.globalTasks.next(this.globalTasks.value);
        return this.globalTasks.value;
      })
    );
  }



}
