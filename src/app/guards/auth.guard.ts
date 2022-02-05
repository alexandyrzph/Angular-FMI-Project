import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(private router: Router,
        private authService: AuthService) {
    }

    canLoad(route: Route): boolean {
        const loggedUser = this.authService.getLoggedUser();
        if (!loggedUser) {
            this.router.navigate(['/auth', 'login']);
            return false;
        }
        return true;
    }
}