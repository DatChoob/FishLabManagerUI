import { Component, OnInit, Input } from '@angular/core';
import { TableElement } from 'angular4-material-table';
// import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';
import { TankManagementService } from '../../../shared/tank-management.service'
import { DialogService } from '../../../shared/dialogs.service'
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tank-management-detail',
  templateUrl: './tank-management-detail.component.html',
  styleUrls: ['./tank-management-detail.component.css']
})
export class TankManagementDetailComponent implements OnInit {
  id: string;
  row: Tank;
  // Projects: ProjectID, Trial Code, Start/End Date, UserIDs, Status
  // Will need all dataSource-related lines of code for projects table
  // dataSource: MatTableDataSource<Tank>;

  constructor(private readonly route: ActivatedRoute,
    private tankManagementService: TankManagementService,
    private dialogService: DialogService) {
  }

  tankList: Tank[] = [
    { tankId: 1, projID: 2, UID: 123, status: 'Cool', speciesNames: 'Cool Fish' },
    { tankId: 2, projID: 3, UID: 555, status: 'Bad', speciesNames: 'Bad Fish' },
    { tankId: 3, projID: 4, UID: 666, status: 'Dumb', speciesNames: 'Dumb Fish' },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      console.log(this.id);
      if (this.id) {
        this.row = cloneDeep(this.tankManagementService.getTankByProperty(this.id))
        console.log("Row: " + this.row);
      }
    }
    )
    // this.dataSource = new MatTableDataSource(this.tankListArray);
  }

  confirmSave(row: Tank) {
    // TODO: implement
  }

  confirmDelete(row: Tank) {
    // TODO: Route back to initial tank management page after delete
    this.openDialog().subscribe(userConfirmed => {
      if (userConfirmed) {
        this.tankManagementService.deleteTank(row).subscribe(response => { });
      }
    });
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
