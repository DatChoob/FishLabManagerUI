import { Component, OnInit, Input } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { Species } from '../../../shared/models/species';

import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';
import { DialogService } from '../../../shared/dialogs.service';
import { SpeciesService } from '../../../shared/api-services/species.service';



@Component({
  selector: 'app-admin-species',
  templateUrl: './admin-species.component.html',
  styleUrls: ['./admin-species.component.css']
})
export class AdminSpeciesComponent implements OnInit {

  displayedColumns = ['originalName', 'currentName', 'commonName', 'actionsColumn'];
  dataSource: TableDataSource<Species>;

  constructor(private speciesService: SpeciesService, private dialogService : DialogService) { }

ngOnInit(){
 this.speciesService.speciesList.subscribe(data => {
   let clone: Species[] = cloneDeep(data);
   this.dataSource = new TableDataSource(clone);
 })
}

  
confirmSave(row: TableElement<Species>){
 if(row.validator.valid && !!row.currentData.id){
   this.speciesService.createOrUpdate(row.currentData).subscribe(
     allSpecies => {
       row.confirmEditCreate();
     }, err => console.log(err));
 }
}
  
cancelOrDelete(row: TableElement<Species>){
  if(!row.editing){
    this.openDialog().subscribe(userConfirmed =>{
      if(userConfirmed){
        this.speciesService.deleteSpecies(row.currentData).subscribe(resonse => {});
      }
    });
  }else{
    row.cancelOrDelete();
  }
}

openDialog(): Observable<boolean>{
  return this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?')
}

}









