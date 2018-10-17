import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { GlobalMaintenance } from '../models/globalMaintenance';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGlobalService {

  globalTasks: BehaviorSubject<GlobalMaintenance[]> = new BehaviorSubject<GlobalMaintenance[]>([]);
  constructor(private http: HttpClient) { }

  getGlobalMaintenanceTasks(){
    return this.http.get<GlobalMaintenance[]>(`${environment.endpoints.GLOBAL_TASK}`).pipe(
      tap(globalMaintenancesList => {
        this.globalTasks.next(globalMaintenancesList)
      })
    )
  }

  updateRowInformation(globalMaintenance: GlobalMaintenance): Observable<GlobalMaintenance[]>{
    return this.http.put<GlobalMaintenance>(`${environment.endpoints.GLOBAL_TASK}/${globalMaintenance.globalTaskCompletedId}`, globalMaintenance).pipe(
      map(globalMaintenanceFromApi => { 
        let indexToUpdate = this.globalTasks.value.findIndex(globalMaintenanceTask => globalMaintenanceTask.globalTaskCompletedId == globalMaintenance.globalTaskCompletedId);
        this.globalTasks.value[indexToUpdate] = globalMaintenanceFromApi;
        this.globalTasks.next(this.globalTasks.value);
        return this.globalTasks.value;
       })
    );
  }
}