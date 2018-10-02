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


  
  constructor(private maintenanceRoomService: MaintenanceRoomService) { }

  ngOnInit() {
  }
  onLinkClick(event: MatTabChangeEvent){
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  }
}