import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Participant } from "src/app/shared/models/participant";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {


  participants: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  // startedEditing = new Subject<number>();

  constructor(private http: HttpClient) { }
  loadParticipants(getLatest?: boolean): Observable<Participant[]> {
    if (this.participants.value.length == 0 || getLatest) {
      this.http.get<Participant[]>(environment.endpoints.ACCOUNT).subscribe(
        allParticipants => {
          this.participants.next(allParticipants)
        }
      );
    }
    return this.participants.asObservable();
  }

  getParticipant(participantCode: string): Participant {
    console.log(this.participants.value);
    let indexToUpdate = this.participants.value.findIndex(currentParticipant => currentParticipant.participantCode == participantCode);
    return this.participants.value[indexToUpdate];
  }

  saveParticipant(oldParticipantCode: string, updatedParticipant: Participant) {
    return this.http.put(environment.endpoints.ACCOUNT + "/" + oldParticipantCode, updatedParticipant)
      .pipe(
        map((apiParticipant: Participant) => {
          console.log(apiParticipant);
          let indexToUpdate = this.participants.value.findIndex(participants => participants.participantCode == updatedParticipant.participantCode);
          this.participants.value[indexToUpdate] = apiParticipant;
          this.participants.next(this.participants.value)
          return apiParticipant;
        }
        ));
  }

  addParticipant(newParticipant: Participant) {

    let originalData = this.participants.getValue();
    return this.http.post(environment.endpoints.ACCOUNT, newParticipant)
      .pipe(
        map((apiNewParticipant: Participant) => {
          console.log(apiNewParticipant);
          originalData.push(apiNewParticipant)
          this.participants.next(originalData)
          return apiNewParticipant;
        })
      )
  }

  deleteParticipant(oldParticipant: Participant) {
    return this.http.delete(environment.endpoints.ACCOUNT + "/" + oldParticipant.participantCode)
      .pipe(
        map((apiDeleteParticipant: Participant) => {
          console.log(apiDeleteParticipant);
          let indexToDelete = this.participants.value.findIndex(participants => participants.participantCode == oldParticipant.participantCode)
          this.participants.value.splice(indexToDelete, 1)
          this.participants.next(this.participants.value)
        })
      )


  }




}
