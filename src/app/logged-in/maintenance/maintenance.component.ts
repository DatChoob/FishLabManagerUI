import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MaintenanceRoomService } from '../../shared/api-services/maintenance-room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {



  constructor(public maintenanceRoomService: MaintenanceRoomService) { }

  ngOnInit() {
    this.maintenanceRoomService.getRoomList().subscribe(rooms => {
      //we do a deep clone so that any edits in the table don't reflect in our globalTasks in the service

    })
  }
  buildRoomUrl(roomId) {
    return "room/" + roomId
  }

  dateSunday() {
    let today = new Date();
    let lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
    return lastSunday;
  }

  dateSaturday() {
    let today = new Date();
    let lastSunday = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return lastSunday;
  }

}