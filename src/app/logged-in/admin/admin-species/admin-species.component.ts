import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Species } from '../../../shared/models/species';

import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';
import { DialogService } from '../../../shared/dialogs.service';
import { SpeciesService } from '../../../shared/api-services/species.service';
import {MatSnackBar} from '@angular/material';
import { duration, isDuration } from 'moment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-species',
  templateUrl: './admin-species.component.html',
  styleUrls: ['./admin-species.component.css']
})
export class AdminSpeciesComponent implements OnInit {

  displayedColumns = ['originalName', 'commonName', 'currentName', 'actionsColumn'];
  dataSource: TableDataSource<Species>;

  constructor(private speciesService: SpeciesService, public snackBar: MatSnackBar, private dialogService : DialogService) { }

ngOnInit(){

 this.speciesService.loadSpecies().subscribe(data => {
   let clone: Species[] = cloneDeep(data);
   this.dataSource = new TableDataSource(clone, Species);
 })
}

confirmSave(row: TableElement<Species>){
 if(row.validator.valid){
   this.speciesService.createOrUpdate(row.currentData).subscribe(
     allSpecies => {
       row.confirmEditCreate();
       this.snackBar.open("Saved", "", {duration:1000});
     }, err => console.log(err));
 }
}
  
cancelOrDelete(row: TableElement<Species>){
  if(!row.editing){
    this.openDialog().subscribe(userConfirmed =>{
      if(userConfirmed){
        this.speciesService.deleteSpecies(row.currentData).subscribe(resonse => {});
        this.snackBar.open("Species", "DELETED", {duration:1000});
      }
    });
  }else{
    row.cancelOrDelete();
  }
}

openDialog(): Observable<boolean>{
  return this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?')
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
   });
}

}









