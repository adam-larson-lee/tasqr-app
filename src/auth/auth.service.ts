import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Auth } from './auth';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<Auth> {
        return this.http.post<Auth>('http://localhost:3000/api/login', {email, password})
            .pipe(
              tap(this.storeSession),
            );
    }

    private storeSession(auth: Auth): Auth{
        // const expiresAt = moment().add(auth.expires,'second');

        localStorage.setItem('authToken', auth.token);
        // localStorage.setItem("authExpires", JSON.stringify(auth.expires);

        return auth;
    }

    logout(): void {
        localStorage.removeItem('authToken');
        // localStorage.removeItem("authTokenExpires");
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration(): moment.Moment {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
