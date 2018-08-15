import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
/**
 * The AuthGuard Service is to tell is if someone is allowed in the routes it's attache to.
 * So if a user is logged in, canActive with return true. else we will be navigated to the login page
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
/**
 * 
 * @param router used to routed to other pages if not authenticated
 * Angular will inject the router into the constructor for us.
 * Labeling as private will dynamically create a local variable for us to use the router variable.
 */
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
