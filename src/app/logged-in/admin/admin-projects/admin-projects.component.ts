import { Project } from './../../../shared/models/project';
import { Observable } from 'rxjs';
import { DialogService } from '../../../shared/dialogs.service';
import { Component, OnInit } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { ProjectService } from '../../../shared/api-services/project.service';
import { cloneDeep } from 'lodash';
import { RoomService } from '../../../shared/api-services/room.service';
import {MatSnackBar} from '@angular/material';
import { duration, isDuration } from 'moment';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  dataSource: TableDataSource<Project>;

  displayedColumns = ['project', 'tankList', 'actionsColumn'];
  // constructor(private dialogService: DialogService, public roomService: RoomService,  
  //   private projectService: ProjectService) { }
    constructor(private dialogService: DialogService, public roomService: RoomService, public snackBar: MatSnackBar, 
      private projectService: ProjectService) { }


     


  ngOnInit() {

    this.roomService.loadRooms().subscribe();
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      if (projects && projects.length > 0) {
        this.dataSource = new TableDataSource<Project>(cloneDeep(projects));
      }
    });
  }


  confirmSave(row: TableElement<Project>) {
    if (row.validator.valid)
      this.projectService.createOrUpdate(row.currentData)
        .subscribe(
          allRooms => {
            row.confirmEditCreate();
            //open snackbar
            this.snackBar.open("Saved!", "", {duration: 1000});
            
            
            
              

          },
      
          err => console.log(err));
            
            //this.snackBar.open("ERROR", "Not saved", {duration:1000});
            
          
  }

  cancelOrDelete(row: TableElement<Project>) {
    if (!row.editing) {
      //means row was not edit mode and we are deleting entry
      //delete row from database
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.projectService.deleteProject(row.currentData).subscribe(response => { 
            // here for delete
            this.snackBar.open("Project", "DELETED", {duration:1000});
            

          });
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
  
   //this.snackBar.open("Deleted");
   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
     });
  }
  }