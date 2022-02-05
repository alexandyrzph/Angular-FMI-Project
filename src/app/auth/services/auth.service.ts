import { Injectable } from "@angular/core";
import { Login } from "../models/login.model";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Register } from "../models/register.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    loggedUserIsOrganization$ = new BehaviorSubject<User | null>(null);
    isDefaultUser$ = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) { }

    login$(data: Login): Observable<User | null> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
            map((response: User[]) => {
                const user = response.find((u => u.username == data.username && u.password == data.password));
                if (!user) return null;

                return user;
            })
        );
    }

    register$(user: Register): Observable<User | null> {
        return this.http.post<User>(`${environment.apiUrl}/users`, user);
    }

    logout(): void {
        localStorage.removeItem('loggedUser');
        this.setLoggedUserIsOrganization$(null);
        this.setDefaultUser(null);
    }

    hasPermission(role: string): boolean {
        const loggedUser = this.getLoggedUser();
        return loggedUser?.role === role;
    }


    setLoggedUser(user: User): void {
        delete user.password;
        localStorage.setItem('loggedUser', JSON.stringify(user));
        if (user.role == 'organization') {
            this.setLoggedUserIsOrganization$(user);
        }
        this.setDefaultUser(user);
    }

    getLoggedUser(): User | null {
        let userInLocalStorage: string | null = localStorage.getItem('loggedUser');
        if (userInLocalStorage == null) return null;
        const loggedUser = JSON.parse(userInLocalStorage) as User;
        if (loggedUser.role == 'organization') {
            this.setLoggedUserIsOrganization$(loggedUser);
        }
        this.setDefaultUser(loggedUser);
        return loggedUser;
    }

    patchUser$(user: User, id: number) {
        return this.http.patch<User>(`${environment.apiUrl}/users/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
    }

    getLoggedUserIsOrganization$(): Observable<User | null> {
        return this.loggedUserIsOrganization$.asObservable();
    }

    setLoggedUserIsOrganization$(value: User | null): void {
        this.loggedUserIsOrganization$.next(value);
    }

    getDefaultUser(): Observable<User | null> {
        return this.isDefaultUser$.asObservable();
    }

    setDefaultUser(value: User | null): void {
        this.isDefaultUser$.next(value);
    }

}