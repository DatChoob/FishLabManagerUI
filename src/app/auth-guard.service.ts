import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const loggedIn =  true;
    //TODO implement a way to determine if user has logged in
    if (!loggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
