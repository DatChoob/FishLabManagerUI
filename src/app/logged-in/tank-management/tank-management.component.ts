import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Tank } from '../../shared/models/tank';
import { TankManagementService } from '../../shared/tank-management.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tank-management',
  templateUrl: './tank-management.component.html',
  styleUrls: ['./tank-management.component.css']
})

export class TankManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Tank>;
  tankListObservable: Observable<Tank[]>;
  tankListArray: Tank[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'projID', 'UID', 'status', 'speciesNames'];
  selectedRowIndex = 1;
  
  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute,
    private tankManagementService: TankManagementService) {
    }

  ngOnInit() {
    this.tankListObservable = this.tankManagementService.getTankList();
    this.tankListObservable.subscribe(tankList => {
      this.tankListArray = tankList;
    });

    this.dataSource = new MatTableDataSource(this.tankListArray);    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  highlightSelectedRow(row) {
    this.selectedRowIndex = row.id;
    console.log("Selected row with index #" + row.id); //TODO DELETE
  }

  addRow() {
    this.router.navigate(['details/'], {relativeTo:this.route});
  }

  modifyRow() {
    this.router.navigate(['details/' + this.selectedRowIndex], {relativeTo:this.route});
  }

  deleteRow() {
    // TODO
  }

}

