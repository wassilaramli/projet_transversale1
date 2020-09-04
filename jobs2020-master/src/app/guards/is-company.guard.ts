import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {  AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class IsCompanyGuard implements CanActivate, CanActivateChild {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthService
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = this.authenticationService.currentUserValue;
 
    if (this.currentUser.role=="company") {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
  
canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   this.currentUser = this.authenticationService.currentUserValue;
  if (this.currentUser.role=="company") {
      // authorised so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
}

}
