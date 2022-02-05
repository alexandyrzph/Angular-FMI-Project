import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../models/register.model';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rePass: ['', [Validators.required]],
            role: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        let user = this.formGroup.value;
        if (user.username.trim() == '' || user.password.trim() == '' || user.role == '' || user.email.trim() == '') return alert('All fields are required!');
        if (user.password != user.rePass) return alert('Passwords don\'t match!');
        user = this.formGroup.value as Register;
        delete user.rePass;
        user.role = user.role.toLocaleLowerCase();
        this.authService.register$(user).subscribe({
            next: (user) => {
                if (user == null) return alert('No user found!');
                this.authService.setLoggedUser(user);
                this.router.navigate(['/main']);
            }
        });
    }

}
