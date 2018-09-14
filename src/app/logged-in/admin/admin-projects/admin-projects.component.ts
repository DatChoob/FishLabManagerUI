import { Project } from './../../../shared/models/project';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { ProjectService } from '../../../shared/api-services/project.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  dataSource: TableDataSource<Project>;

  displayedColumns = ['project', 'tankList', 'actionsColumn'];
  tankList = ['Tank 1','Tank 2', 'Tank 3']
  constructor(private dialogService: DialogService, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projectService.projects.subscribe(newProjects => {
        let clone: Project[] = cloneDeep(newProjects);
        this.dataSource = new TableDataSource<Project>(clone);
      })
    });
  }

  confirmSave(row: TableElement<Project>) {
    if (row.validator.valid) 
      this.projectService.createOrUpdate(row.currentData)
      .subscribe(
        allRooms => {
          row.confirmEditCreate();
        },
        err => console.log(err));        
    }


  cancelOrDelete(row: TableElement<Project>) {
    if (!row.editing) {
      //means row was in not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.projectService.deleteProject(row.currentData).subscribe(response => {});
        }
      });
    } else {
      row.cancelOrDelete();

    }
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?');
  }

}