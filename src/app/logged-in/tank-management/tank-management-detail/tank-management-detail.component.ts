import { Component, OnInit, Input } from '@angular/core';
import { TableElement } from 'angular4-material-table';
// import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';
import { TankManagementService } from '../../../shared/api-services/tank-management.service'
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
    private readonly router: Router,
    private tankManagementService: TankManagementService,
    private dialogService: DialogService) {
  }

  tankList: Tank[] = [
    { tankId: 1, projID: 2, UID: 123, status: 'Pregnant', speciesNames: 'Cool Fish' },
    { tankId: 2, projID: 3, UID: 555, status: 'Crispy Fries', speciesNames: 'Bad Fish' },
    { tankId: 3, projID: 4, UID: 666, status: 'Dead', speciesNames: 'Dumb Fish' },
  ];

  statusList = [
    {value: 'Pregnant'},
    {value: 'Crispy Fries'},
    {value: 'Dead'},
    {value: 'Setup'}
  ]

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
    this.openDialog()
      .subscribe(
        userConfirmed => {
          if (userConfirmed) {
            // this.tankManagementService.createOrUpdateTank(row).subscribe(response => { });
            this.router.navigate(['../../'], { relativeTo: this.route });
          }
        });
  }

  confirmDelete(row: Tank) {
    // TODO: Route back to initial tank management page after delete
    this.openDialog().subscribe(userConfirmed => {
      if (userConfirmed) {
        this.tankManagementService.deleteTank(row).subscribe(response => { });
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
