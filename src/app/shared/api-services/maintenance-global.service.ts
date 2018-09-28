import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGlobalService {

  globalTasks: BehaviorSubject<Maintenance[]> = new BehaviorSubject<Maintenance[]>(
    [
      { taskId: 1, taskName:"Clean the tanks", lastUpdateUserName:"" , lastUpdateTimeStamp: "", status:false },
    ]
  );
  constructor(private http: HttpClient) { }

  updateRowInformation(maintenance: Maintenance): Observable<Maintenance[]>{
    console.log(maintenance);
    maintenance.lastUpdateUserName = "Rob";
    maintenance.lastUpdateTimeStamp = "1/2/90"
    return of(maintenance).pipe(
      map(maintenanceFromApi => { 
        let indexToUpdate = this.globalTasks.value.findIndex(globalMaintenanceTask => globalMaintenanceTask.taskId == maintenanceFromApi.taskId);
        this.globalTasks.value[indexToUpdate] = maintenanceFromApi;
    
        this.globalTasks.next(this.globalTasks.value);
        return this.globalTasks.value;
       })
    );
    
    
  }
}