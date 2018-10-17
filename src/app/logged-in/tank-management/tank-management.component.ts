import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tank } from '../../shared/models/tank';
import { TankManagementService } from '../../shared/api-services/tank-management.service'

@Component({
  selector: 'app-tank-management',
  templateUrl: './tank-management.component.html',
  styleUrls: ['./tank-management.component.css']
})

export class TankManagementComponent implements OnInit {


  tankListArray: Tank[];

  constructor(public tankManagementService: TankManagementService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.tankManagementService.getRoomList().subscribe(rooms =>{
    })

    


  }

}

