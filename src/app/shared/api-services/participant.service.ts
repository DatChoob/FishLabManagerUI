import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Participant } from "src/app/shared/models/participant";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  participants:BehaviorSubject<Participant[]> =  new BehaviorSubject<Participant[]>([]);

  constructor(private http:HttpClient) { }
  loadParticipants():Observable<Participant[]>{
    this.http.get<Participant[]>(environment.endpoints.ACCOUNT).subscribe(
      allParticipants=>{
        this.participants.next(allParticipants)
      }
    )
    return this.participants.asObservable();
  }
}
