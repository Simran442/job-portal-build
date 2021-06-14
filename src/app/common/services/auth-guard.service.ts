
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Constants } from '../Constants';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router
    ) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // process request for logged-in user
        if (localStorage.getItem('currentUser')) {
            return true;           
        } else {
            //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            this.router.navigate(['login']);
            return false;
        }
    }
}