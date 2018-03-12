import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Allow us to redirect from login to the main route if we are logged in.
 */
@Injectable()
export class AuthNoLoginService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}