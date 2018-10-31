import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Species } from '../models/species';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
 providedIn: 'root'
})
export class SpeciesService {
 
    species: BehaviorSubject<Species[]> = new BehaviorSubject<Species[]>([]);
 /**
  * This method will call the api to either add a new row or update existing.
  * the api will respond back with the update/new object.
  * if the data coming in doesnt have an id, then we know this will be a new object.
  * @param data data to add to database
  */
 

 constructor(private http: HttpClient) { }

 createOrUpdate(speciesToCreateOrUpdate: Species) {
    console.log(speciesToCreateOrUpdate)
    if (speciesToCreateOrUpdate.speciesId) {
      //this is an update. find the index by id and replace the item at the index with our updated one
      return this.updateSpecies(speciesToCreateOrUpdate);
    } else {
      //This is a create. In real api call, the roomResponse will already have the id. we assigning one for now
      return this.createSpecies(speciesToCreateOrUpdate);
    }
  }


 loadSpecies(): Observable<Species[]> {
     this.http.get<Species[]>(environment.endpoints.SPECIES)
    .subscribe(allSpecies => {
          this.species.next(allSpecies)
          return this.species.value;
    });
    return this.species.asObservable();
  }
 
  createSpecies(speciesToCreate : Species): Observable<Species[]> {
    let originalData = this.species.getValue()
    return this.http.post(environment.endpoints.SPECIES, speciesToCreate).pipe(
      map((createdSpecies: Species) => {
        console.log("created species" + createdSpecies);  
        originalData.push(createdSpecies);
        this.species.next(originalData);
        return this.species.value;
      })
    )
  }


updateSpecies(speciesToUpdate : Species): Observable<Species[]> {
    console.log(speciesToUpdate);
    let indexToUpdate = this.species.value.findIndex(currentSpecies => currentSpecies.speciesId == speciesToUpdate.speciesId);
    return this.http.put(environment.endpoints.SPECIES + "/" + speciesToUpdate.speciesId, speciesToUpdate).pipe(
        map((updatedSpecies: Species) => {
          console.log("updated species" + updatedSpecies);
          this.species.value[indexToUpdate] = updatedSpecies;
          this.species.next(this.species.value);
          return this.species.value;
        })
      );
  }

  deleteSpecies(speciesToDelete: Species) {
    let indexToDelete = this.species.value.findIndex(currentSpecies => currentSpecies.speciesId == speciesToDelete.speciesId);
    return this.http.delete(environment.endpoints.SPECIES + "/" + speciesToDelete.speciesId).pipe(
        map((deletedSpecies: Species) => {
          console.log("deleted species" + deletedSpecies);
          this.species.value.splice(indexToDelete, 1)
          this.species.next(this.species.value)
        })
      );
  }

  getSpeciesById(speciesId: number): Species {
    let returnIndex = this.species.value.findIndex(speciesItem => speciesItem.speciesId == speciesId);
    console.log(returnIndex);
    return this.species.value[returnIndex];
  }
}
