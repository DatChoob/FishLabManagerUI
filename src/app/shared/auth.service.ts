import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

import * as moment from "moment";
import { shareReplay, tap } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) {
  }

  login(username: string, password: string) {
    return this.http.post<User>(environment.endpoints.LOGIN, { username, password })
      .pipe(
        tap(this.setSession),
        shareReplay()
      );
  }

  private setSession(authResult) {
    const accessToken = authResult.access_token;
    const decodedAccessToken = jwt_decode(accessToken);
    const expiresAt = moment.unix(decodedAccessToken.exp)

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration()) && localStorage.getItem("access_token");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
