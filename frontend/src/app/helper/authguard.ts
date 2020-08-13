import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {UIStateService} from '../services/ui.state.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: UIStateService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.userLogedIn;
        if (!currentUser) {
                this.router.navigate(['/']);
                return false;
        } else{

            // authorised so return true
            return true;
        }
    }

    
}

 