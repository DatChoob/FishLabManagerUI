import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TankManagementService } from '../../../shared/api-services/tank-management.service';


@Component({
  selector: 'app-tank-management-room-overview',
  templateUrl: './tank-management-room-overview.component.html',
  styleUrls: ['./tank-management-room-overview.component.css']
})
export class TankManagementRoomOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'projID', 'UID', 'trialCode', 'status', 'speciesNames'];
  selectedRowIndex = 0;
  dataSource: MatTableDataSource<any>;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute,
    private tankManagementService: TankManagementService) { }

  roomId: number;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //triggered every time the url changes
      // (+) before `params.get()` turns the string into a number
      this.roomId = +params.get("roomId");
      if (this.roomId) {
        this.selectedRowIndex = 0;
        //get the tanks for this room
        this.tankManagementService.getTankListByRoomId(this.roomId).subscribe(
          tanksForSelectedRoom => {
            //ignore this error. it still works
            this.dataSource = new MatTableDataSource(tanksForSelectedRoom);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  highlightSelectedRow(index) {
    this.selectedRowIndex = index;
  }

  addRow() {
    this.router.navigate(['details/'], { relativeTo: this.route });
  }

  modifyRow() {
    this.router.navigate(['details/' + this.dataSource.data[this.selectedRowIndex].tankId], { relativeTo: this.route });
  }

}
