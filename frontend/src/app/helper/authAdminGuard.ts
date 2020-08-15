import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {UIStateService} from '../services/ui.state.service';

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: UIStateService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLogedIn = this.authenticationService.userLogedIn;
        const currentUser = this.authenticationService.currentUserValue;
        if (isLogedIn && currentUser.role) {
            return true;
        } else{
            this.router.navigate(['/']);
            return false;
        }
    }

    
}

 