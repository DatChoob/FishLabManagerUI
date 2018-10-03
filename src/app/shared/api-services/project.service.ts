import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) { }


  getProjects(): Observable<Project[]> {
    this.http.get<Project[]>(environment.endpoints.PROJECT)
      .subscribe((projects: Project[]) => {
        this.projects.next(projects);
      });
    return this.projects.asObservable();
  }
  createProject(projectToCreate: Project): Observable<Project[]> {

    let originalData = this.projects.getValue();
    return this.http.post<Project>(environment.endpoints.PROJECT, projectToCreate).pipe(
      map(createdProject => {
        originalData.push(createdProject);
        this.projects.next(originalData);
        return this.projects.value;
      })
    );
  }

  updateProject(projectToUpdate: Project): Observable<Project[]> {
    let originalData = this.projects.getValue();
    return this.http.put<Project>(`${environment.endpoints.PROJECT}/${projectToUpdate.projectId}`, projectToUpdate).pipe(
      map(updatedProject => {
        //this is an update. find the index by id and replace the item at the index with our updated one
        let indexToUpdate = this.projects.value.findIndex(currentProject => currentProject.projectId == updatedProject.projectId);
        originalData[indexToUpdate] = updatedProject;
        this.projects.next(originalData);
        return this.projects.value;
      })
    );
  }

  createOrUpdate(projectToCreateOrUpdate: Project): Observable<Project[]> {
    if (projectToCreateOrUpdate.projectId) {
      return this.updateProject(projectToCreateOrUpdate);
    } else {
      return this.createProject(projectToCreateOrUpdate);
    }

  }

  deleteProject(projectToDelete: Project): Observable<Project> {
    let indexToDelete = this.projects.value.findIndex(currentProject => currentProject.projectId == projectToDelete.projectId);
    return this.http.delete(`${environment.endpoints.PROJECT}/${projectToDelete.projectId}`).pipe(
      map(
        (deletedProject: Project) => {
          //TODO replace this with a real http request to delete by id.
          this.projects.value.splice(indexToDelete, 1);
          this.projects.next(this.projects.value);
          return deletedProject;
        })
    );
  }


}