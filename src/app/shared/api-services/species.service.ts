import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Species } from '../models/species';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class SpeciesService {
 
    speciesList: BehaviorSubject<Species[]> = new BehaviorSubject<Species[]>(
    [
    { id: 1, originalName: 'Fish1', commonName: 'Brazillian ram', currentName: 'Mikrogeophagus ramirezi' },
    { id: 2, originalName: 'Fish2', commonName: 'Rainbow cichlid', currentName: 'Herotilapia multispinosa' }
    ]
 );
 /**
  * This method will call the api to either add a new row or update existing.
  * the api will respond back with the update/new object.
  * if the data coming in doesnt have an id, then we know this will be a new object.
  * @param data data to add to database
  */
 
  


 constructor(private http: HttpClient) { }
 createOrUpdate(speciesToCreateOrUpdate: Species): Observable<Species[]> {
    return this.createOrUpdateSpecies(speciesToCreateOrUpdate);
  }

 private createOrUpdateSpecies(speciesToCreateOrUpdate: Species){
     let originalData = this.speciesList.value;
     return of(speciesToCreateOrUpdate).pipe(
         map(species => {
             if(speciesToCreateOrUpdate.id == null){
                 species.id = 21;
                 originalData.push(species);
             } else{
                 let indexToUpdate = this.speciesList.value.findIndex(speciesList => speciesList.id == speciesToCreateOrUpdate.id);
                 originalData[indexToUpdate] = speciesToCreateOrUpdate;
             }
             this.speciesList.next(originalData);
             return this.speciesList.value;
         })
     );
 }

 deleteSpecies(speciesToDelete: Species) {
    return this.deleteSelectedSpecies(speciesToDelete);
 
  }
 private deleteSelectedSpecies(speciesToDelete){
    let indexToDelete = this.speciesList.value.findIndex(speciesList => speciesList.id == speciesToDelete.id);
    this.speciesList.value.splice(indexToDelete, 1);
    this.speciesList.next(this.speciesList.value);
    return of(true);

 }
}
