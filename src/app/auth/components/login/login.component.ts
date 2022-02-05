import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        const body = this.formGroup.value as Login;
        if (body.username.trim() == '' || body.password.trim() == '') return alert('All fields are required!');
        this.authService.login$(body).subscribe({
            next: (user) => {
                if (user == null) return alert('No user found!');
                this.authService.setLoggedUser(user);
                this.router.navigate(['/main']);
            }
        });
    }

}
