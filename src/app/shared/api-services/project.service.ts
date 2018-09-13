import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(
    [
      { id: 1, projectName: 'Project1', tanks: 1},
      { id: 2, projectName: 'Project2', tanks: 1}
    ]
  );

  getProjects(): Observable<Project[]>{
    return this.projects.asObservable();
  }

  createOrUpdate(projectToCreateOrUpdate: Project): Observable<Project[]> {
    let originalData = this.projects.getValue();
    //TODO: remove of() with http request
    return of(projectToCreateOrUpdate).pipe(
      map(projectResponse => {
        if (projectToCreateOrUpdate.id == null) {
          //This is a create. In real api call, the projectResponse will already have the id. we assigning one for now
          projectResponse.id = 21;
          originalData.push(projectResponse);
        } else {
          //this is an update. find the index by id and replace the item at the index with our updated one
          let indexToUpdate = this.projects.value.findIndex(currentProject => currentProject.id == projectToCreateOrUpdate.id);
          originalData[indexToUpdate] = projectToCreateOrUpdate;
        }

        this.projects.next(originalData);
        return this.projects.value;
      })
    );
  }

  deleteProject(projectToDelete: Project) {
    //TODO replace this with a real http request to delete by id.
    let indexToDelete = this.projects.value.findIndex(currentProject => currentProject.id == projectToDelete.id);
    this.projects.value.splice(indexToDelete, 1);
    this.projects.next(this.projects.value);
    return of(true);
}


}