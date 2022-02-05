import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    currentUser!: User | null;
    defaultUser!: User | null;

    hasUser!: boolean;
    destroy$ = new Subject<boolean>();

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authService.getLoggedUserIsOrganization$().pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (loggedUserIsOrganization$) => {
                this.currentUser = loggedUserIsOrganization$;
            }
        }), this.authService.getDefaultUser().subscribe({
            next: (defaultUser) => {
                this.defaultUser = defaultUser;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onLogout(): void {
        this.authService.logout();

        this.router.navigate(['/auth', 'login']);
    }

}
