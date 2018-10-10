import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Tank } from '../../shared/models/tank';
import { TankManagementService } from '../../shared/api-services/tank-management.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tank-management',
  templateUrl: './tank-management.component.html',
  styleUrls: ['./tank-management.component.css']
})

export class TankManagementComponent implements OnInit {


  tankListArray: Tank[];

  constructor(private tankManagementService: TankManagementService, private router: ActivatedRoute) { }

  ngOnInit() {

  }

}

