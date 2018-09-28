import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRoomService {

  roomList: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(
    [
        {roomId: 1, building: "Hum", roomNumber: 119},
        {roomId: 2, building: "Hum", roomNumber: 121},
        {roomId: 3, building: "Hum", roomNumber: 123}
    ]
);

  roomTasks: BehaviorSubject<Maintenance[]> = new BehaviorSubject<Maintenance[]>(
    [
      { taskId: 1, taskName:"Clean the tanks", lastUpdateUserName:"" , lastUpdateTimeStamp: "", status:false },
    ]
  );
  constructor(private http: HttpClient) { }

  roomInfo$: Observable<Room[]> = this.roomList.asObservable();

  getTankList(): Observable<Room[]> {
    return this.roomList;
  }
  updateRowInformation(maintenance: Maintenance): Observable<Maintenance[]>{
    console.log(maintenance);
    maintenance.lastUpdateUserName = "Rob";
    maintenance.lastUpdateTimeStamp = "1/2/90"
    return of(maintenance).pipe(
      map(maintenanceFromApi => { 
        let indexToUpdate = this.roomTasks.value.findIndex(globalMaintenanceTask => globalMaintenanceTask.taskId == maintenanceFromApi.taskId);
        this.roomTasks.value[indexToUpdate] = maintenanceFromApi;
    
        this.roomTasks.next(this.roomTasks.value);
        return this.roomTasks.value;
       })
    );
    
    
  }

}