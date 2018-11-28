import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { names } from '../models/names';
import{FishFeed} from '../models/fish-feed'
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  
  fishFeedStatus: Subject<FishFeed> = new Subject<FishFeed>( );

  getLatestStatus() : Observable <FishFeed> {
    return this.http.get<FishFeed>(environment.endpoints.FISH_FEED + "/latest").pipe(
      tap(fishfeed => this.fishFeedStatus.next(fishfeed)))
  }

updateStatus(fishFeed:FishFeed){
  return this.http.put<FishFeed>(environment.endpoints.FISH_FEED + "/latest",fishFeed).pipe(
    tap(fishfeed => this.fishFeedStatus.next(fishfeed)))
}

  constructor(private http: HttpClient) { }
}
