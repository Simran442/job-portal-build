
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Constants } from '../Constants';
@Injectable()
export class AuthGuardService implements CanActivate {
    currentUser;
    constructor(
        private router: Router
    ) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // process request for logged-in user
        if (localStorage.getItem('currentUser')) {
            // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // if (this.currentUser.role_id == 2) {
            //     this.router.navigate(['/job-listing']);
            // } else {
            //     this.router.navigate(['/employer-dashboard']);
            // }
            return true;
        } else {
            //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            this.router.navigate(['/login']);
            return false;
        }
    }
}