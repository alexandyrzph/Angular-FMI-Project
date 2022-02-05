import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    formGroup!: FormGroup;

    destroy$ = new Subject<boolean>();

    currentUser!: User | null;
    constructor(private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getLoggedUser();
        this.buildForm(this.currentUser);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onSubmit(): void {
        const user = this.formGroup.value as User;
        const id = this.currentUser?.id as number;
        this.authService.patchUser$(user, id).subscribe({
            next:() => {
                this.router.navigate(['/main']);
            }
        });
    }

    onDelete(): void {
        const id = this.currentUser?.id as number;
        this.authService.deleteUser(id).subscribe({
            next: () => {
                this.authService.logout();
                this.router.navigate(['/auth', 'login']);
            }
        });
    }

    private buildForm(currentUser: User | null): void {
        this.formGroup = this.fb.group({
            username: [currentUser?.username, [Validators.required]],
            email: [currentUser?.email, [Validators.required]],
            password: [currentUser?.password, [Validators.required]]
        });
    }

}
