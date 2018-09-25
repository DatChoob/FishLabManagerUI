import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MaintenanceTaskDefinition } from '../models/mantenance-task-definition';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRoomService {

  roomTasks: BehaviorSubject<Maintenance[]> = new BehaviorSubject<Maintenance[]>(
    [
      { taskId: 1, name: "Clean the tanks", date: "", status:false },
    ]
  );
  constructor(private http: HttpClient) { }
}