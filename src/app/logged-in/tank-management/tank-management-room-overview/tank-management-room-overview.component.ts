import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Tank } from '../../../shared/models/tank';
import { Router, ActivatedRoute } from '@angular/router';
import { TankManagementService } from '../../../shared/api-services/tank-management.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-tank-management-room-overview',
  templateUrl: './tank-management-room-overview.component.html',
  styleUrls: ['./tank-management-room-overview.component.css']
})
export class TankManagementRoomOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['tankId', 'trialCode', 'status', 'maintainer_participantCode'];
  selectedTankId = 0;

  dataSource: MatTableDataSource<Tank>;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute,
    private tankManagementService: TankManagementService,
    public authService: AuthService) { }

  roomId: number;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //triggered every time the url changes
      // (+) before `params.get()` turns the string into a number
      this.roomId = +params.get("roomId");
      if (this.roomId) {
        
        this.selectedTankId = 0;
        //get the tanks for this room
        this.tankManagementService.getTankListByRoomId(this.roomId).subscribe(
          tanksForSelectedRoom => {
            if (tanksForSelectedRoom.length > 0) {
              this.dataSource = new MatTableDataSource(tanksForSelectedRoom);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }else{
              this.dataSource = new MatTableDataSource([]);
            }
          }
        )
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  highlightSelectedRow(tankId) {
    this.selectedTankId = tankId;
  }

  addRow() {
    this.router.navigate(['details/'], { relativeTo: this.route });
  }

  modifyRow() {
    this.router.navigate(['details/' + this.selectedTankId], { relativeTo: this.route });
  }

}
